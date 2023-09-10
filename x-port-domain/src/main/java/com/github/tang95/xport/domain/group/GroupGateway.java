package com.github.tang95.xport.domain.group;

import com.github.tang95.xport.dto.ListGroupQuery;

import java.util.List;

public interface GroupGateway {
    void create(Group group);

    List<Group> listGroup(ListGroupQuery query);
}
