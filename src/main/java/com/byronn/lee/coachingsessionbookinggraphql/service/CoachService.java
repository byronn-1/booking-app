package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Club;
import com.byronn.lee.coachingsessionbookinggraphql.entity.Coach;
import com.byronn.lee.coachingsessionbookinggraphql.entity.CoachInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.ClubRepository;
import com.byronn.lee.coachingsessionbookinggraphql.repository.CoachRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/*
* This service operates on the CoachRepository, this saves data for a Coach entity.
* A Coach is related to a Club and can create Sessions for a Club.
* */
@Service
public class CoachService {
    private final CoachRepository coachRepository;
    private final ClubService clubService;

    public CoachService(CoachRepository coachRepository, ClubService clubService) {
        this.coachRepository = coachRepository;
        this.clubService = clubService;
    }


    /*
    * allCoaches takes no arguments and returns a list of allCoaches in the Coach database.
    * */
    @Transactional
    public List<Coach> allCoaches(){
        return coachRepository.findAll();
    }

    @Transactional
    public List<Coach> getAllCoachesFromClubId(Long clubId){ return coachRepository.findByClubId(clubId);}

    /*
    * addCoach accepts the parameter of a CoachInput entity and creates a new Coach entry in the Coach database.
    * It returns the newly created Coach.
    * */
    @Transactional
    public Coach addCoach(CoachInput coachInput) {
        // Assume validation and coach creation logic here

        Coach newCoach = new Coach();
        newCoach.setFirstName(coachInput.getFirstName());
        newCoach.setLastName(coachInput.getLastName());
        newCoach.setEmail(coachInput.getEmail());
        newCoach.setPhoneNo(coachInput.getPhoneNo());
        newCoach.setClubId(coachInput.getClubId());

        Coach savedCoach;
        try {
            savedCoach = coachRepository.save(newCoach);
        } catch (Exception e) {
            throw new RuntimeException("Error saving new Coach to the repository", e);
        }

        // Delegate to ClubService to update the has_coaches flag
        clubService.updateHasCoaches(coachInput.getClubId(), true);

        return savedCoach;
    }
}
