package com.daou.xenmanager.controller;

import com.ibm.staf.STAFException;
import com.ibm.staf.STAFHandle;
import com.ibm.staf.STAFResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by user on 2016-12-07.
 */
@Controller
public class MainController {
    private static STAFHandle handle;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public String index(){
        return test();
    }

    public String init(){
        String result = "fail";
        String kkk = "";
        try{
            handle = new STAFHandle("Xen-Manager");
        }catch (STAFException e){
            return "Error registering wigth STAF, RC : " + e.rc;
        }
        //STAFResult sr = handle.submit2("local", "xen_manager", "list snap-shot");
        STAFResult sr = handle.submit2("local", "xen_manager", "list snap-shot");
        if(sr.rc != 0){
            result = "RC : " + sr.rc + ", " + sr.result;
        }else{
            result = sr.result.substring(1, sr.result.length()-1);
            String[] keyValuePairs = result.split(",");
            Map<String, String> map = new HashMap<>();
            for(String pair : keyValuePairs){
                String[] item = pair.split("=");
                map.put(item[0], item[1]);
            }
            result = map.toString();
        }
        return result;
    }

    public String test(){
        String result = "fail";
        try{
            handle = new STAFHandle("Xen-Manager");
        }catch (STAFException e){
            return "Error registering wigth STAF, RC : " + e.rc;
        }
        //STAFResult sr = handle.submit2("local", "xen_manager", "list snap-shot");
        STAFResult sr = handle.submit2("local", "xen_manager", "list snap-shot");
        if(sr.rc != 0){
            result = "RC : " + sr.rc + ", " + sr.result;
        }else{
            //result = sr.resultObj.toString();
            result = sr.result;
        }

        return result;
    }
}
