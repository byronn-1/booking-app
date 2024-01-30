package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Coach;
import com.byronn.lee.coachingsessionbookinggraphql.entity.CoachInput;
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

    public CoachService(CoachRepository coachRepository) {
        this.coachRepository = coachRepository;
    }

    /*
    * allCoaches takes no arguments and returns a list of allCoaches in the Coach database.
    * */
    @Transactional
    public List<Coach> allCoaches(){
        return coachRepository.findAll();
    }

    /*
    * addCoach accepts the parameter of a CoachInput entity and creates a new Coach entry in the Coach database.
    * It returns the newly created Coach.
    * */
    @Transactional
    public Coach addCoach(CoachInput coachInput){

        Coach newCoach = new Coach();
        newCoach.setFirstName(coachInput.getFirstName());
        newCoach.setLastName(coachInput.getLastName());
        newCoach.setEmail(coachInput.getEmail());
        newCoach.setPhoneNo(coachInput.getPhoneNo());
        newCoach.setClubId(coachInput.getClubId());

        try{
            return coachRepository.save(newCoach);
        }catch(Exception e){
            throw new RuntimeException("Error saving new Coach to the repository", e);
        }
    }
}
