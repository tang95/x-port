package com.github.tang95.xport.group;

import com.alibaba.cola.catchlog.CatchAndLog;
import com.github.tang95.xport.api.ResourceService;
import com.github.tang95.xport.domain.resource.ResourceGateway;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@CatchAndLog
public class ResourceServiceImpl implements ResourceService {
    @Resource
    private ResourceGateway resourceGateway;
}
