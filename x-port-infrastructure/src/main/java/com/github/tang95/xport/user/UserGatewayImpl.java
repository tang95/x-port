package com.github.tang95.xport.user;

import com.github.tang95.xport.domain.user.User;
import com.github.tang95.xport.domain.user.UserGateway;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserGatewayImpl implements UserGateway {
    @Resource
    private UserRepository userRepository;

    @Override
    public String addUser(User user) {
        UserDO userDO = new UserDO()
                .setName(user.getName())
                .setEmail(user.getEmail())
                .setUsername(user.getUsername())
                .setPicture(user.getPicture())
                .setPassword(user.getPassword());
        return userRepository.insert(userDO).getId();
    }

    @Override
    public User getUserByUsername(String username) {
        UserDO userDO = userRepository.findByUsername(username);
        if (userDO == null) {
            return null;
        }
        return new User()
                .setId(userDO.getId())
                .setUsername(userDO.getUsername())
                .setName(userDO.getName())
                .setPicture(userDO.getPicture())
                .setEmail(userDO.getEmail())
                .setPassword(userDO.getPassword());
    }

    @Override
    public List<User> listUser() {
        List<UserDO> userDOS = userRepository.findAll();
        return userDOS.stream()
                .map(userDO -> new User()
                        .setId(userDO.getId())
                        .setName(userDO.getName())
                        .setUsername(userDO.getUsername())
                        .setPicture(userDO.getPicture())
                        .setEmail(userDO.getEmail())
                )
                .collect(Collectors.toList());
    }
}
