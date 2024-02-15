package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Club;
import com.byronn.lee.coachingsessionbookinggraphql.service.ClubService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

/*
* This Controller operates on the Club service and facilitates the reading of Club listings in the Club SQL table.
*/
@Controller
public class ClubQueryResolver {
    private final ClubService clubService;

    public ClubQueryResolver(ClubService clubService) {
        this.clubService = clubService;
    }

    /*
    * allClubs accepts no parameters and returns the entire collection of Clubs in the Clubs SQL table.
    */
    @QueryMapping
    public List<Club> allClubs(){
        return clubService.allClubs();
    }


    @QueryMapping
    public Club getClubFromClubId(@Argument Long clubId){
        return clubService.getClubFromClubId(clubId);
    }
}
