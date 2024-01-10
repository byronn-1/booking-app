package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Coach;
import com.byronn.lee.coachingsessionbookinggraphql.service.CoachService;
import jakarta.transaction.Transactional;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CoachQueryResolver {
    private final CoachService coachService;

    public CoachQueryResolver(CoachService coachService) {
        this.coachService = coachService;
    }

    @QueryMapping
    public List<Coach> allCoaches(){
        return coachService.allCoaches();
    }
}
