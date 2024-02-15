package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Club;
import com.byronn.lee.coachingsessionbookinggraphql.entity.ClubInput;
import com.byronn.lee.coachingsessionbookinggraphql.service.ClubService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

/*
* This controller operates on the Club service and facilitates Create, Update and Delete.
* The Club service allows for operations on the Club SQL table.
* A Club is any entity that has a group of people.
*/
@Controller
public class ClubMutationResolver {

    private final ClubService clubService;

    public ClubMutationResolver(ClubService clubService) {
        this.clubService = clubService;
    }

    /*
    * createClub allows for the creation of new clubs. It accepts ClubInput as an argument.
    * ClubInput models the Club entity without ID's (which are created in the databasing system).
    * It should return the Club that has been created.
    */
    @MutationMapping
    public Club createClub(@Argument(name="clubInput")ClubInput clubInput){
        return clubService.createClub(clubInput);
    }

}
