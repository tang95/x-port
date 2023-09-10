package com.github.tang95.xport.system;

import com.github.tang95.xport.domain.system.SystemGateway;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class SystemGatewayImpl implements SystemGateway {
    @Resource
    private SystemRepository systemRepository;
}
