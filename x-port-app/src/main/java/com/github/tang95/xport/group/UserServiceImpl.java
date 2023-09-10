package com.github.tang95.xport.group;

import com.alibaba.cola.catchlog.CatchAndLog;
import com.github.tang95.xport.api.UserService;
import com.github.tang95.xport.domain.user.UserGateway;
import com.github.tang95.xport.dto.AddUserCmd;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@CatchAndLog
public class UserServiceImpl implements UserService {
    @Resource
    private UserGateway userGateway;

    @Override
    public String addUser(AddUserCmd cmd) {
        return null;
    }
}
