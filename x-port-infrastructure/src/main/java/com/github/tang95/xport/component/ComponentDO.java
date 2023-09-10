package com.github.tang95.xport.component;

import com.github.tang95.xport.domain.Link;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;
import java.util.Map;

@Data
@Document("component")
@ToString
@Accessors(chain = true)
public class ComponentDO {
    @MongoId
    private String id;
    private String name;
    private String title;
    private String description;
    private String type;
    private String lifecycle;
    private String ownerID;
    private String systemID;

    private List<Link> links;
    private List<String> tags;
    private Map<String, String> labels;
    private Map<String, String> annotations;

    private List<String> resourceIDs;
    private List<String> componentIDs;
    private List<String> subComponentIDs;
}
