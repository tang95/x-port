package com.github.tang95.xport.group;

import com.alibaba.cola.catchlog.CatchAndLog;
import com.github.tang95.xport.api.SystemService;
import com.github.tang95.xport.domain.system.SystemGateway;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@CatchAndLog
public class SystemServiceImpl implements SystemService {
    @Resource
    private SystemGateway systemGateway;
}
