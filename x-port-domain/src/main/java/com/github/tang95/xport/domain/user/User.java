package com.github.tang95.xport.domain.user;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@ToString
@Accessors(chain = true)
public class User {
    private String id;
    private String name;
    private String username;
    private String email;
    private String picture;
    private String password;
}
