package com.daou.xenmanager.domain;

import java.io.Serializable;

/**
 * Created by user on 2016-12-14.
 */
public class XenObject implements Serializable {
    private String name;
    private String uuid;

    public XenObject(String name, String uuid) {
        this.name = name;
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    @Override
    public String toString() {
        return "XenObject{" +
                "name='" + name + '\'' +
                ", uuid='" + uuid + '\'' +
                '}';
    }
}
