package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Owner;
import com.byronn.lee.coachingsessionbookinggraphql.entity.OwnerInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.OwnerRepository;
import com.byronn.lee.coachingsessionbookinggraphql.service.OwnerService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class OwnerMutationResolver {
    private final OwnerService ownerService;

    public OwnerMutationResolver(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @MutationMapping
    public Owner addOwner(@Argument(name="ownerInput") OwnerInput ownerInput){
        return ownerService.addOwner(ownerInput);
    }
}
