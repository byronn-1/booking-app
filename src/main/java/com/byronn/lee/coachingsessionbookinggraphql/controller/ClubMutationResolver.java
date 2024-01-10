package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Club;
import com.byronn.lee.coachingsessionbookinggraphql.entity.ClubInput;
import com.byronn.lee.coachingsessionbookinggraphql.service.ClubService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ClubMutationResolver {

    private final ClubService clubService;

    public ClubMutationResolver(ClubService clubService) {
        this.clubService = clubService;
    }

    @MutationMapping
    public Club createClub(@Argument(name="clubInput")ClubInput clubInput){
        return clubService.createClub(clubInput);
    }
}
