package com.github.tang95.xport.group;

import com.github.tang95.xport.domain.group.Group;
import com.github.tang95.xport.domain.group.GroupGateway;
import com.github.tang95.xport.dto.ListGroupQuery;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class GroupGatewayImpl implements GroupGateway {
    @Resource
    private GroupRepository groupRepository;

    @Override
    public void create(Group group) {
    }

    @Override
    public List<Group> listGroup(ListGroupQuery query) {
        return null;
    }
}
