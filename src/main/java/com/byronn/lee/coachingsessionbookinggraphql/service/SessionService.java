package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Session;
import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/*
* This Service operates on the SessionRepository, this saves data for a Session entity.
* A Session is a given period of time that an Owner or Coach can allocate and a Student can book.
* */
@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository){
        this.sessionRepository = sessionRepository;
    }

    /*
    * allSessions accepts no parameters and returns a list of all the Sessions in the SessionsRepository.
    * */
    @Transactional
    public List<Session> allSessions(){
        return sessionRepository.findAll();
    }
    @Transactional
    public List<Session> getSessionsByStudentFirstName(String firstName) {
        return sessionRepository.findByStudent_FirstName(firstName);
    }

    @Transactional
    public List<Session> getSessionsWithClubId(Long id){
        return sessionRepository.findByClubId(id);
    }

    @Transactional
    public Session createSessionWithClubId(SessionInput sessionInput, Long clubId){
       if(sessionInput == null || clubId == null){
           throw new IllegalArgumentException("Session input or club id cannot be null");
       }

        Session newSession = new Session();
        newSession.setSessionType(sessionInput.getSessionType());
        newSession.setLocation(sessionInput.getLocation());
        newSession.setTime(sessionInput.getTime());
        newSession.setIsBooked(sessionInput.getIsBooked());
        newSession.setIsPaidFor(sessionInput.getIsPaidFor());
        newSession.setIsCompleted(sessionInput.getIsCompleted());
        newSession.setClubId(clubId);
        newSession.setDuration(sessionInput.getDuration());
        try {
            return sessionRepository.save(newSession);
        } catch (Exception e) {
            throw new RuntimeException("Error saving session to the repository", e);
        }
    }
    @Transactional
    public Session createSession(SessionInput sessionInput){
        System.out.println("is called");

        if (sessionInput == null) {
            // Handle or throw an exception based on your application's requirements
            throw new IllegalArgumentException("Session input cannot be null");
        }

/*        if (sessionInput.getStudentId() != null) {
            Student student = studentRepository.findById(sessionInput.getStudentId())
                    .orElse(null); // return null if student not found
            newSession.setStudent(student);
        }*/
        Session newSession = new Session();
        newSession.setSessionType(sessionInput.getSessionType());
        newSession.setLocation(sessionInput.getLocation());
        newSession.setTime(sessionInput.getTime());
        newSession.setIsBooked(sessionInput.getIsBooked());
        newSession.setIsPaidFor(sessionInput.getIsPaidFor());
        newSession.setIsCompleted(sessionInput.getIsCompleted());
        try {
            return sessionRepository.save(newSession);
        } catch (Exception e) {
            throw new RuntimeException("Error saving session to the repository", e);
        }
    }
    @Transactional
    public List<Session> getSessionsByDay(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        return sessionRepository.findByTimeBetween(startOfDay, endOfDay);

    }

    @Transactional
    public List<Session> getSessionsByWeek(LocalDate startOfWeekDate) {

        if (startOfWeekDate.getDayOfWeek() != DayOfWeek.MONDAY) {
            throw new IllegalArgumentException("The start date must be a Monday");
        }

        LocalDateTime start = startOfWeekDate.atStartOfDay();
        LocalDateTime end = startOfWeekDate.plusWeeks(1).atStartOfDay();

        List<Session> sessions = sessionRepository.findByTimeBetween(start, end);

        // Sort sessions by day
        return sessions.stream()
                .sorted(Comparator.comparing(Session::getTime))
                .collect(Collectors.toList());
    }

}
