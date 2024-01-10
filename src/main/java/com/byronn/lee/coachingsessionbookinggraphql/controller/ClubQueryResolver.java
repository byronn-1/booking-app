package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Club;
import com.byronn.lee.coachingsessionbookinggraphql.service.ClubService;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ClubQueryResolver {
    private final ClubService clubService;

    public ClubQueryResolver(ClubService clubService) {
        this.clubService = clubService;
    }

    @QueryMapping
    public List<Club> allClubs(){
        return clubService.allClubs();
    }
}
