package com.daou.xenmanager.controller;

import com.daou.xenmanager.core.XenConnector;
import com.daou.xenmanager.entity.XenServer;
import com.ibm.staf.STAFException;
import com.ibm.staf.STAFHandle;
import com.ibm.staf.STAFResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by user on 2016-12-07.
 */
@Controller
public class MainController {
    private static STAFHandle handle;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public String index(){
        return initXen();
    }

    public String init(){
        String result = "fail";

        try{
            handle = new STAFHandle("Xen-Manager");
        }catch (STAFException e){
            return "Error registering wigth STAF, RC : " + e.rc;
        }

        STAFResult sr = handle.submit2("local", "test", "list");

        if(sr.rc != 0){
            result = "RC : " + sr.rc;
        }else{
            result = sr.result;
        }

        return result;
    }

    public String initXen(){
        XenServer server = new XenServer("vm2.terracetech.co.kr", "root", "qwopZX!@");
        String result = "";
        try{
            result = XenConnector.connect(server);
        }catch (Exception e){
            e.printStackTrace();
        }

        return result;
    }

}
