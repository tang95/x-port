package com.github.tang95.xport.api;

import com.github.tang95.xport.dto.AddUserCmd;

public interface UserService {
    String addUser(AddUserCmd cmd);
}
