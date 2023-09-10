package com.github.tang95.xport.domain.group;

import com.alibaba.cola.domain.Entity;
import com.github.tang95.xport.domain.Link;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Map;

@Data
@ToString
@Accessors(chain = true)
@Entity
public class Group {
    private String id;
    private String name;
    private String title;
    private String description;
    private String type;
    private List<Link> links;
    private List<String> tags;
    private Map<String, String> labels;
    private Map<String, String> annotations;

    private String parentID;
    private List<String> userIDs;
}
