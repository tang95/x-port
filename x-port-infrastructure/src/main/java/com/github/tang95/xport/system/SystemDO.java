package com.github.tang95.xport.system;

import com.github.tang95.xport.domain.Link;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;
import java.util.Map;

@Data
@Document("system")
@ToString
@Accessors(chain = true)
public class SystemDO {
    @MongoId
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
