package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Coach;
import com.byronn.lee.coachingsessionbookinggraphql.service.CoachService;
import jakarta.transaction.Transactional;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

/*
* This Controller operates on the CoachService which facilitates operations on the Coach SQL table.
*/
@Controller
public class CoachQueryResolver {
    private final CoachService coachService;

    public CoachQueryResolver(CoachService coachService) {
        this.coachService = coachService;
    }

    /*
    * allCoaches accepts no parameters and returns a list of all Coaches in the SQL table.
    * */
    @QueryMapping
    public List<Coach> allCoaches(){
        return coachService.allCoaches();
    }
}
