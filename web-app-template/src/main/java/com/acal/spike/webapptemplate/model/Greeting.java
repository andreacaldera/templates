package com.acal.spike.webapptemplate.model;

import org.springframework.stereotype.Component;

@Component(value = "greeting")
public class Greeting {

    public String greet() {
        return "Hello pal! 'Sup?";
    }
}
