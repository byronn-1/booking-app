package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Owner;
import com.byronn.lee.coachingsessionbookinggraphql.entity.OwnerInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.OwnerRepository;
import com.byronn.lee.coachingsessionbookinggraphql.service.OwnerService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

/*
 * This controller operates on the Owner service and facilitates Create, Update and Delete.
 * The Owner service allows for the operations on the Owner SQL table.
 * An Owner is any entity that has Clubs belonging to them.
 */
@Controller
public class OwnerMutationResolver {
    private final OwnerService ownerService;

    public OwnerMutationResolver(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    /*
     * addOwner allows for the creation of new Owners. It accepts OwnerInput as an argument.
     * OwnerInput models the Owner entity without ID's (which are created in the databasing system).
     * It should return the Owner that has been created.
     */
    @MutationMapping
    public Owner addOwner(@Argument(name="ownerInput") OwnerInput ownerInput){
        return ownerService.addOwner(ownerInput);
    }
}
