package com.daou.xenmanager.exception;

import org.springframework.core.ExceptionDepthComparator;

/**
 * Created by user on 2016-12-14.
 */
public class XenSTAFException extends Exception{
    private String type;

    public XenSTAFException(String type, String message){
        super("EXCEPTION TYPE : " + type + ", MESSAGE : " + message);
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
