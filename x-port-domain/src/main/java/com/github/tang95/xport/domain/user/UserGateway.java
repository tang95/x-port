package com.github.tang95.xport.domain.user;

import java.util.List;

public interface UserGateway {
    String addUser(User user);

    User getUserByUsername(String username);

    List<User> listUser();
}
