package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.*;
import com.byronn.lee.coachingsessionbookinggraphql.service.ClubService;
import com.byronn.lee.coachingsessionbookinggraphql.service.OwnerService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;


/*
* This Controller operates on both the Club and Owner Service and facilitates Create, Update and Delete.
* The Club service allows for operations on the Club SQL table.
* The Owner service allows for operations on the Owner SQL table.
* A Club is any entity that has a group of Students.
* An Owner is any entity that has Clubs belonging to them.
 */
@Controller
public class ClubAndOwnerMutationResolver {

    private final ClubService clubService;
    private final OwnerService ownerService;

    public ClubAndOwnerMutationResolver(ClubService clubService, OwnerService ownerService) {
        this.clubService = clubService;
        this.ownerService = ownerService;
    }

    @MutationMapping
    public ClubOwnerResponse createClubWithOwner(@Argument(name="clubInput") ClubInput clubInput, @Argument(name="ownerInput") OwnerInput ownerInput) {
        Club club = null;
        Owner owner = null;

        try {
            club = clubService.createClub(clubInput);
            owner = ownerService.createOwnerWithClubId(ownerInput, club.getId());

            if (owner == null) {
                // Rollback: Delete the club if owner creation fails
                clubService.deleteClub(club.getId());
                return null;
            }
            return new ClubOwnerResponse(club, owner);
        } catch (Exception e) {
            System.err.println("Error creating club: " + e.getMessage());
            if (club != null) {
                // Rollback: Attempt to delete the club if any exception occurs
                try {
                    clubService.deleteClub(club.getId());
                } catch (Exception deleteException) {
                    System.err.println("Error during rollback: " + deleteException.getMessage());
                }
            }
            return null;
        }
    }
}

