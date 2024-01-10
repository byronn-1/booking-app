package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Owner;
import com.byronn.lee.coachingsessionbookinggraphql.entity.OwnerInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.OwnerRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerService {
    private final OwnerRepository ownerRepository;

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

        try{
            return ownerRepository.save(newOwner);

        }catch(Exception e) {
            throw new RuntimeException("Error saving new owner to the repository", e);
        }
    }

}
