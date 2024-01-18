package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Owner;
import com.byronn.lee.coachingsessionbookinggraphql.entity.OwnerInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.OwnerRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;


/*
* This Service operates on the OwnerRepository and saves data for an Owner entity.
* */
@Service
public class OwnerService {
    private final OwnerRepository ownerRepository;
    private static final Logger logger = LoggerFactory.getLogger(OwnerService.class);
    public OwnerService(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    /*
    * allOwners accepts no arguments and returns a list of all Owners in the Owner database.
    * */
    @Transactional
    public List<Owner> allOwners(){
        return ownerRepository.findAll();
    }

    /*
    * addOwner accepts an argument of an OwnerInput entity and creates a record for an Owner and returns a newly created Owner.
    *
    * */
    @Transactional
    public Owner addOwner(OwnerInput ownerInput){
        Owner newOwner = new Owner();
        newOwner.setFirstName(ownerInput.getFirstName());
          newOwner.setLastName(ownerInput.getLastName());
          newOwner.setEmail(ownerInput.getEmail());
          newOwner.setPhoneNo(ownerInput.getPhoneNo());
          newOwner.setClubId(newOwner.getClubId());
        newOwner = ownerRepository.save(newOwner);
        return newOwner;
    }

    /*
    *
    * */
    @Transactional
    public Owner createOwnerWithClubId(OwnerInput ownerInput, Long clubId){
        Owner newOwner = new Owner();
        newOwner.setFirstName(ownerInput.getFirstName());
        newOwner.setLastName(ownerInput.getLastName());
        newOwner.setEmail(ownerInput.getEmail());
        newOwner.setPhoneNo(ownerInput.getPhoneNo());
        newOwner.setClubId(clubId);

        try{
            return ownerRepository.save(newOwner);

        }catch(Exception e){
            System.err.println("Error creating owner: " + e.getMessage());
            return null;
        }

    }
/*    @Transactional
    public Boolean deleteClubAndOwnerFromOwnerId(Long id){
        if (id == null) {
            throw new IllegalArgumentException("Owner ID must not be null");
        }
        try{
            Long clubId = ownerRepository.findClubIdByOwnerId(ownerId);
            if (clubId != null) {
                clubRepository.deleteById(clubId);
            }
            ownerRepository.deleteById(id);
            return true;
        }catch (DataAccessException e){
            logger.error("Error deleting owner and club", e);
            return false;
        }
    }*/

}
