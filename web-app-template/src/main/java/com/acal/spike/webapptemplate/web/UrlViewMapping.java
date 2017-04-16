package com.acal.spike.webapptemplate.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.acal.spike.webapptemplate.model.Greeting;

@Controller
public class UrlViewMapping {

    @Autowired
    private Greeting greeting;

    @RequestMapping(value = {"/{viewName}"}, method = RequestMethod.GET)
    public String view(final String viewName, Model model) {
        model.addAttribute("greeting", greeting);
        return viewName;
    }

}