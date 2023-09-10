package com.github.tang95.xport.user;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@Document("user")
@ToString
@Accessors(chain = true)
public class UserDO {
    @MongoId
    private String id;
    private String name;
    private String username;
    private String email;
    private String picture;
    private String password;
}
