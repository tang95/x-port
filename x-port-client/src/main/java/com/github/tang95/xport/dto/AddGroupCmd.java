package com.github.tang95.xport.dto;

import com.alibaba.cola.dto.Command;
import com.github.tang95.xport.dto.data.GroupDTO;
import lombok.Data;

@Data
public class AddGroupCmd extends Command {
    private GroupDTO groupDTO;
}
