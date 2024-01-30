package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Coach;
import com.byronn.lee.coachingsessionbookinggraphql.entity.CoachInput;
import com.byronn.lee.coachingsessionbookinggraphql.service.CoachService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

/*
* This Controller operates on the Coach service.
* The Coach service allows for the operations on the Coach SQL table.
* A Coach is an entity that is a group leader for a Session that has singular or multiple Students.
*/
@Controller
public class CoachMutationResolver {
    private final CoachService coachService;

    public CoachMutationResolver(CoachService coachService) {
        this.coachService = coachService;
    }

    /*
    * addCoach allows for the creation of a new Coach, it accepts a CoachInput as an argument.
    * A CoachInput models a Coach entity (without the associated ID's).
    * addCoach should return a new Coach.
    */
    @MutationMapping
    public Coach addCoach(@Argument(name="coachInput") CoachInput coachInput){
        return coachService.addCoach(coachInput);
    }
}
