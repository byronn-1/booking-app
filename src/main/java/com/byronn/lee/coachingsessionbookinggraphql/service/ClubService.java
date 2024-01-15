package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Club;
import com.byronn.lee.coachingsessionbookinggraphql.entity.ClubInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.ClubRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@Service
public class ClubService {
    private static final Logger logger = LoggerFactory.getLogger(ClubService.class);

private final ClubRepository clubRepository;

    public ClubService(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    @Transactional
    public List<Club> allClubs(){
        return clubRepository.findAll();
    }

    @Transactional
    public Club createClub(ClubInput clubInput){
        Club newClub = new Club();
        newClub.setClubName(clubInput.getClubName());
        newClub.setClubType(clubInput.getClubType());
        newClub.setStreetNumber(clubInput.getStreetNumber());
        newClub.setStreetName(clubInput.getStreetName());
        newClub.setAddressLine2(clubInput.getAddressLine2());
        newClub.setCity(clubInput.getCity());
        newClub.setState(clubInput.getState());
        newClub.setCountry(clubInput.getCountry());
        newClub.setPostalCode(clubInput.getPostalCode());
        newClub.setAccCreated(clubInput.getAccCreated());
        newClub.setIsClubPrivate(clubInput.getIsClubPrivate());
        newClub.setWebsiteUrl(clubInput.getWebsiteUrl());

       newClub = clubRepository.save(newClub);
        logger.info("Saved Owner ID: {}", newClub);
        return newClub;
//        try{
//
//
//        }catch(Exception e) {
//            throw new RuntimeException("Error saving new club to the repository", e);
//        }
    }

    @Transactional
    public void deleteClub(Long clubId) {
        try {
            // Assuming you have a method in your repository to delete by ID
            clubRepository.deleteById(clubId);
        } catch (Exception e) {
            System.err.println("Error deleting club: " + e.getMessage());
            throw e; // Re-throw to handle in the caller method
        }
    }
}
