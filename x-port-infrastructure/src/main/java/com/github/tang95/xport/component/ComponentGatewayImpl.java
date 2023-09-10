package com.github.tang95.xport.component;

import com.github.tang95.xport.domain.componet.ComponentGateway;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class ComponentGatewayImpl implements ComponentGateway {
    @Resource
    private ComponentRepository componentRepository;
}
