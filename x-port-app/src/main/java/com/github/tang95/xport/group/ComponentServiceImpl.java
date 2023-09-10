package com.github.tang95.xport.group;

import com.alibaba.cola.catchlog.CatchAndLog;
import com.github.tang95.xport.api.ComponentService;
import com.github.tang95.xport.domain.componet.ComponentGateway;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@CatchAndLog
public class ComponentServiceImpl implements ComponentService {
    @Resource
    private ComponentGateway componentGateway;
}
