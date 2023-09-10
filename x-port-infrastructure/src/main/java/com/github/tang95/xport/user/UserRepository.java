package com.github.tang95.xport.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserDO, String> {
    UserDO findByUsername(String username);
}
