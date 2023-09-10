package com.github.tang95.xport.web;

import com.github.tang95.xport.api.ComponentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/component")
public class ComponentController {
    @Resource
    private ComponentService componentService;
}
