package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Owner;
import com.byronn.lee.coachingsessionbookinggraphql.service.OwnerService;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

/*
 * This Controller operates on the Owner service and facilitates the reading of Owner listings in the Club SQL table.
 */
@Controller
public class OwnerQueryResolver {
    private final OwnerService ownerService;

    public OwnerQueryResolver(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    /*
     * allOwners accepts no parameters and returns the entire collection of Owners in the Owner SQL table.
     */
    @QueryMapping
    public List<Owner>  allOwners(){
        return ownerService.allOwners();
    }
}
