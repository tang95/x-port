package com.github.tang95.xport.api;

import com.alibaba.cola.dto.MultiResponse;
import com.alibaba.cola.dto.Response;
import com.github.tang95.xport.dto.AddGroupCmd;
import com.github.tang95.xport.dto.ListGroupQuery;
import com.github.tang95.xport.dto.data.GroupDTO;

public interface GroupService {
    Response addGroup(AddGroupCmd cmd);

    MultiResponse<GroupDTO> listGroup(ListGroupQuery query);
}
