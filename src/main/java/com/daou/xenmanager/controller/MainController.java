package com.daou.xenmanager.controller;

import com.daou.xenmanager.domain.XenObject;
import com.daou.xenmanager.exception.XenSTAFException;
import com.daou.xenmanager.service.XenService;
import com.daou.xenmanager.util.STAFStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;

/**
 * Created by user on 2016-12-07.
 */
@Controller
public class MainController {
    @Autowired
    private XenService xenService;
    /**
     * XEN-MANAGER-01
     * Get Index Page
     * @return index page
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(){
        return "index";
    }
    /**
     * XEN-MANAGER-02
     * Get List By Type
     * @param type - must have vm or snap-shot
     * @return list page & list data & status
     */
    @RequestMapping(value = "/xen/list", method = RequestMethod.GET)
    public ModelAndView getListByType(Model model, @RequestParam(value = "type", defaultValue = "vm") String type){
        ModelAndView mav = new ModelAndView("list", model.asMap());
        STAFStatus status = null;
        ArrayList<XenObject> list;
        try{
            list = xenService.getListFromSTAFByType(type);
            mav.addObject("list", list);
        }catch (XenSTAFException e){
            status = new STAFStatus(e.toString(), "fail");
        }
        //if status not null == fail
        if(status == null){
            status = new STAFStatus("success", "success");
        }
        mav.addObject("result", status);
        mav.addObject("type", type);
        return mav;
    }
    /**
     * XEN-MANAGER-03
     * Add VM By Snap-Shot
     * @param vmName
     * @param snapUuid
     * @param snapName
     * @return status - success | fail
     */
    @RequestMapping(value = "/xen/add", method = RequestMethod.GET)
    @ResponseBody
    public STAFStatus addVMBySnapshot(@RequestParam(value = "vmName")String vmName, @RequestParam(value = "snapUuid") String snapUuid, @RequestParam(value = "snapName") String snapName){
        STAFStatus result;
        try{
            result = xenService.addVMBySnapshot(vmName, snapUuid, snapName);
        }catch (XenSTAFException e){
            result = new STAFStatus(e.toString(), "fail");
        }
        return result;
    }
    /**
     * XEN-MANAGER-04
     * Delete VM By Name & Uuid
     * @param vmName
     * @param vmUuid
     * @return status - success | fail
     */
    @RequestMapping(value = "/xen/remove", method = RequestMethod.GET)
    @ResponseBody
    public STAFStatus deleteVM(@RequestParam(value = "vmName")String vmName, @RequestParam(value = "vmUuid") String vmUuid){
        STAFStatus result;
        try{
            result = xenService.deleteVM(vmName, vmUuid);
        }catch (XenSTAFException e){
            result = new STAFStatus(e.toString(), "fail");
        }
        return result;
    }
}
