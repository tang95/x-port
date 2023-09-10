package com.github.tang95.xport.web;

import com.alibaba.cola.dto.MultiResponse;
import com.alibaba.cola.dto.Response;
import com.github.tang95.xport.api.GroupService;
import com.github.tang95.xport.dto.AddGroupCmd;
import com.github.tang95.xport.dto.ListGroupQuery;
import com.github.tang95.xport.dto.data.GroupDTO;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/group")
public class GroupController {

    @Resource
    private GroupService groupService;

    @GetMapping(value = "/hello")
    public String helloWorld() {
        return "Hello, welcome to COLA world!";
    }

    @GetMapping(value = "/list")
    public MultiResponse<GroupDTO> listGroup(@RequestParam(required = false) String name) {
        ListGroupQuery query = new ListGroupQuery();
        query.setName(name);
        return groupService.listGroup(query);
    }

    @PostMapping(value = "/add")
    public Response addGroup(@RequestBody AddGroupCmd cmd) {
        return groupService.addGroup(cmd);
    }
}
