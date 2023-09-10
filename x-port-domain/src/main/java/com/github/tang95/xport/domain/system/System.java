package com.github.tang95.xport.domain.system;

import com.github.tang95.xport.domain.Link;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Map;

@Data
@ToString
@Accessors(chain = true)
public class System {
    private String id;
    private String name;
    private String title;
    private String description;
    private String type;
    private String ownerID;
    private String domainID;

    private List<Link> links;
    private List<String> tags;
    private Map<String, String> labels;
    private Map<String, String> annotations;
}
