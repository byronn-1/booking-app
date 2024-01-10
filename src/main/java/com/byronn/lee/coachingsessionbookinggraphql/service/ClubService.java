package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Club;
import com.byronn.lee.coachingsessionbookinggraphql.entity.ClubInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.ClubRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubService {
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
        newClub.setStreetName(clubInput.getStreetName());
        newClub.setAddressLine2(clubInput.getAddressLine2());
        newClub.setCity(clubInput.getCity());
        newClub.setState(clubInput.getState());
        newClub.setPostalCode(clubInput.getPostalCode());
        newClub.setAccCreated(clubInput.getAccCreated());

        try{
            return clubRepository.save(newClub);

        }catch(Exception e) {
            throw new RuntimeException("Error saving new club to the repository", e);
        }
    }
}
