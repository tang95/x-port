package com.github.tang95.xport.dto;

import lombok.Data;

import javax.management.Query;

@Data
public class ListGroupQuery extends Query {
    private String name;
}
