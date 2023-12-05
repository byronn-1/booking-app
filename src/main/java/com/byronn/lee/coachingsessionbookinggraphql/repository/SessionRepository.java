package com.byronn.lee.coachingsessionbookinggraphql.repository;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByStudent_FirstName(String firstName);
    List<Session> findByTimeBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

}