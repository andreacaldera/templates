package com.acal.spike.webapptemplate.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
@Scope(value = "request")
public class Menu {

     @Autowired
     private HttpServletRequest request;

    public String active(final String pathVariable) {
        return request.getRequestURL().toString().contains(pathVariable) ? "active" : "";
    }

}
