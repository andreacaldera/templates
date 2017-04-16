package com.acal.spike.webapptemplate.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/greeter")
public class HelloController {

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String helloStranger() {
        return "Hello stranger";
    }

    @RequestMapping(value = "hello", method = RequestMethod.GET)
    public String hello() {
        return "hello";
    }
}
