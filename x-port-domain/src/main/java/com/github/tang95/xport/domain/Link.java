package com.github.tang95.xport.domain;

import com.alibaba.cola.domain.Entity;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@ToString
@Accessors(chain = true)
@Entity
public class Link {
    private String url;
    private String title;
    private String type;
    private String icon;
}
