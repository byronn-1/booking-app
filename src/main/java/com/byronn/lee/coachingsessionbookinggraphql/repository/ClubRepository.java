package com.byronn.lee.coachingsessionbookinggraphql.repository;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    Club findClubById(Long clubId);
}
