package com.daou.xenmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * Created by user on 2016-12-07.
 */
@SpringBootApplication
public class XenManagerApplication extends SpringBootServletInitializer{
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(XenManagerApplication.class);
    }

    public static void main(String[] args){
            SpringApplication.run(XenManagerApplication.class, args);
    }
}
