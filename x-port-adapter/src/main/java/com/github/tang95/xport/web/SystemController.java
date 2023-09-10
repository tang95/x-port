package com.github.tang95.xport.web;

import com.github.tang95.xport.api.SystemService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/system")
public class SystemController {
    @Resource
    private SystemService systemService;
}
