package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Owner;
import com.byronn.lee.coachingsessionbookinggraphql.entity.OwnerInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.OwnerRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerService {
    private final OwnerRepository ownerRepository;
    private static final Logger logger = LoggerFactory.getLogger(OwnerService.class);
    public OwnerService(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    @Transactional
    public List<Owner> allOwners(){
        return ownerRepository.findAll();
    }

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

    @Transactional
    public Boolean createOwnerWithClubId(OwnerInput ownerInput, Long clubId){
        Owner newOwner = new Owner();
        newOwner.setFirstName(ownerInput.getFirstName());
        newOwner.setLastName(ownerInput.getLastName());
        newOwner.setEmail(ownerInput.getEmail());
        newOwner.setPhoneNo(ownerInput.getPhoneNo());
        newOwner.setClubId(clubId);

        try{
            ownerRepository.save(newOwner);
            return true;
        }catch(Exception e){
            System.err.println("Error creating owner: " + e.getMessage());
            return false;
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
