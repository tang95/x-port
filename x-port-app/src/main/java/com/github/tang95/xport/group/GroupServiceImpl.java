package com.github.tang95.xport.group;

import com.alibaba.cola.catchlog.CatchAndLog;
import com.alibaba.cola.dto.MultiResponse;
import com.alibaba.cola.dto.Response;
import com.github.tang95.xport.api.GroupService;
import com.github.tang95.xport.domain.group.GroupGateway;
import com.github.tang95.xport.dto.AddGroupCmd;
import com.github.tang95.xport.dto.ListGroupQuery;
import com.github.tang95.xport.dto.data.GroupDTO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@CatchAndLog
public class GroupServiceImpl implements GroupService {
    @Resource
    private GroupGateway groupGateway;

    @Override
    public Response addGroup(AddGroupCmd cmd) {
        return null;
    }

    @Override
    public MultiResponse<GroupDTO> listGroup(ListGroupQuery query) {
        return null;
    }
}
