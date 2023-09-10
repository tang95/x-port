package com.github.tang95.xport.resource;

import com.github.tang95.xport.domain.resource.ResourceGateway;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class ResourceGatewayImpl implements ResourceGateway {
    @Resource
    private ResourceRepository resourceRepository;
}
