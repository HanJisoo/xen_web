package com.daou.xenmanager.service;

import com.daou.xenmanager.domain.XenObject;
import com.daou.xenmanager.exception.XenSTAFException;
import com.daou.xenmanager.util.BaseUtil;
import com.daou.xenmanager.util.STAFStatus;
import com.ibm.staf.STAFHandle;
import com.ibm.staf.STAFResult;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by user on 2016-12-14.
 */
@Service
public class XenService {
    private STAFHandle mHandle;

    private STAFHandle initHandler() throws XenSTAFException{
        STAFHandle handle;
        //get STAF handler
        try {
            handle = new STAFHandle("Xen-Manager");
        }catch (Exception e) {
            throw new XenSTAFException("init", e.toString());
        }
        return handle;
    }

    public ArrayList<XenObject> getListFromSTAFByType(String type) throws XenSTAFException{
        HashMap<String, String> resultMap;
        ArrayList<XenObject> resultList = new ArrayList<>();
        //check handler
        if(mHandle == null){
            mHandle = initHandler();
        }
        //send command to STAF Service
        STAFResult sr = mHandle.submit2("local", "xen_manager", "LIST " + type);
        if(sr.rc != 0){
            throw new XenSTAFException("handle", "RC : " + sr.rc + ", " + sr.result);
        }else{
            if(sr.resultObj != null){
                resultMap = (HashMap<String, String>)sr.resultObj;
            }else{
                resultMap = new HashMap<>();
            }
        }
        //make map to list
        if(resultMap.size() != 0){
           for (String uuid : resultMap.keySet()){
               //add data except STAF's default map
               if(!"staf-map-class-name".equals(uuid)){
                   resultList.add(new XenObject(resultMap.get(uuid), uuid));
               }
           }
        }
        return resultList;
    }

    public STAFStatus addVMBySnapshot(String vmName, String snapUuid, String snapName) throws XenSTAFException{
        //make quotation string for STAF request
        String qVmName = BaseUtil.getQuoteString(vmName);
        String qSnapUuid = BaseUtil.getQuoteString(snapUuid);
        String qSnapName = BaseUtil.getQuoteString(snapName);
        STAFStatus status;
        //check handler
        if(mHandle == null){
            mHandle = initHandler();
        }
        //send command to STAF Service
        STAFResult sr = mHandle.submit2("local", "xen_manager", "ADD" + " VM-NAME " + qVmName + " SNAP-NAME " + qSnapName + " SNAP-UUID " + qSnapUuid);
        System.out.println("ADD" + " VM-NAME " + qVmName + " SNAP-NAME " + qSnapName + " SNAP-UUID " + qSnapUuid);
        if(sr.rc != 0){
            throw new XenSTAFException("handle", "RC : " + sr.rc + ", " + sr.result);
        }else{
            status = new STAFStatus(sr.result, "success");
        }
        return status;
    }

    public STAFStatus deleteVM(String vmName, String vmUuid) throws XenSTAFException{
        //make quotation string for STAF request
        String qVmName = BaseUtil.getQuoteString(vmName);
        String qVmUuid = BaseUtil.getQuoteString(vmUuid);
        STAFStatus status;
        //check handler
        if(mHandle == null){
            mHandle = initHandler();
        }
        //send command to STAF Service
        STAFResult sr = mHandle.submit2("local", "xen_manager", "DELETE" + " VM-NAME " + qVmName + " VM-UUID " + qVmUuid);
        if(sr.rc != 0){
            throw new XenSTAFException("handle", "RC : " + sr.rc + ", " + sr.result);
        }else{
            status = new STAFStatus(sr.result, "success");
        }
        return status;
    }
}
