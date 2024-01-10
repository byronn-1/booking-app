package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Coach;
import com.byronn.lee.coachingsessionbookinggraphql.entity.CoachInput;
import com.byronn.lee.coachingsessionbookinggraphql.service.CoachService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class CoachMutationResolver {
    private final CoachService coachService;

    public CoachMutationResolver(CoachService coachService) {
        this.coachService = coachService;
    }

    @MutationMapping
    public Coach addCoach(@Argument(name="coachInput") CoachInput coachInput){
        return coachService.addCoach(coachInput);
    }
}
