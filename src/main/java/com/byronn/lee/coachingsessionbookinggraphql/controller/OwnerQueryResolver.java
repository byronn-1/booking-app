package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Owner;
import com.byronn.lee.coachingsessionbookinggraphql.service.OwnerService;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class OwnerQueryResolver {
    private final OwnerService ownerService;

    public OwnerQueryResolver(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @QueryMapping
    public List<Owner>  allOwners(){
        return ownerService.allOwners();
    }
}
