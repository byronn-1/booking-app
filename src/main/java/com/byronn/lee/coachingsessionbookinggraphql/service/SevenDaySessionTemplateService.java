package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.*;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionRepository;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionTemplateRepository;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SevenDaySessionTemplateRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class SevenDaySessionTemplateService {

    private final SevenDaySessionTemplateRepository sevenDaySessionRepository;
    private final SessionTemplateService sessionTemplateService;
    private final SessionRepository sessionRepository;
    private final SessionTemplateRepository sessionTemplateRepository;
    public SevenDaySessionTemplateService(SevenDaySessionTemplateRepository sevenDaySessionRepository,SessionRepository sessionRepository, SessionTemplateService sessionTemplateService, SessionTemplateRepository sessionTemplateRepository){
        this.sevenDaySessionRepository = sevenDaySessionRepository;
        this.sessionRepository = sessionRepository;
        this.sessionTemplateService = sessionTemplateService;
        this.sessionTemplateRepository = sessionTemplateRepository;
    }

    public List<SevenDaySessionTemplate> getSevenDaySessionTemplatesWithClubId(Long clubId){

        List<SevenDaySessionTemplate> sevenDaySessionTemplates = sevenDaySessionRepository.findByClubId(clubId);

        for (SevenDaySessionTemplate template : sevenDaySessionTemplates) {
            // Fetch SessionTemplates associated with the current SevenDaySessionTemplate
            List<SessionTemplate> sessionTemplates = sessionTemplateRepository.findAllBySevenDaySessionTemplateId(template.getId());
            template.setSessionTemplates(sessionTemplates);
        }
        return sevenDaySessionTemplates;
    }


    @Transactional
    public List<Session> createSessionsWithClubIdFromTemplateId(Long templateId, LocalDateTime weekStartDate, Long clubId){
        SevenDaySessionTemplate sevenDayTemplate = sevenDaySessionRepository.findById(templateId)
                .orElseThrow(() -> new IllegalArgumentException("Template with ID " + templateId + " not found"));

        // Manually fetch SessionTemplates associated with the SevenDaySessionTemplate
        List<SessionTemplate> sessionTemplates = sessionTemplateRepository.findBySevenDaySessionTemplateId(templateId);

        if (sessionTemplates.isEmpty()) {
            throw new IllegalStateException("No session templates available for the given seven-day template");
        }

        List<Session> createdSessions = new ArrayList<>();
        for (SessionTemplate sessionTemplate : sessionTemplates) {
            Session session = createSessionFromTemplateWithClubId(sessionTemplate, weekStartDate, clubId);
            createdSessions.add(sessionRepository.save(session));
        }

        return createdSessions;
    }


    @Transactional
    public List<Session> createSessionsFromId(Long templateId, LocalDateTime weekStartDate) {
        SevenDaySessionTemplate sevenDayTemplate = sevenDaySessionRepository.findById(templateId)
                .orElseThrow(() -> new IllegalArgumentException("Template with ID " + templateId + " not found"));

        // Manually fetch SessionTemplates associated with the SevenDaySessionTemplate
        List<SessionTemplate> sessionTemplates = sessionTemplateRepository.findBySevenDaySessionTemplateId(templateId);

        if (sessionTemplates.isEmpty()) {
            throw new IllegalStateException("No session templates available for the given seven-day template");
        }

        List<Session> createdSessions = new ArrayList<>();
        for (SessionTemplate sessionTemplate : sessionTemplates) {
            Session session = createSessionFromTemplate(sessionTemplate, weekStartDate);
            createdSessions.add(sessionRepository.save(session));
        }

        return createdSessions;
    }

    @Transactional
    public List<SevenDaySessionTemplate> getAllSevenDaySessionTemplates(){
        List<SevenDaySessionTemplate> sevenDaySessionTemplates = sevenDaySessionRepository.findAll();

        for (SevenDaySessionTemplate template : sevenDaySessionTemplates) {
            // Fetch SessionTemplates associated with the current SevenDaySessionTemplate
            List<SessionTemplate> sessionTemplates = sessionTemplateRepository.findAllBySevenDaySessionTemplateId(template.getId());
            template.setSessionTemplates(sessionTemplates);
        }

        return sevenDaySessionTemplates;
    }

    @Transactional
    public SevenDaySessionTemplate createSevenDaySessionsTemplate(SevenDaySessionTemplateInput data, LocalDateTime weekStartDate) {

        if (data == null) {
            throw new IllegalArgumentException("Input cannot be null");
        }

        SevenDaySessionTemplate sevenDayTemplate = new SevenDaySessionTemplate();

        sevenDayTemplate.setTemplateName(data.getTemplateName());
        sevenDayTemplate.setCoach(data.getCoach());

        SevenDaySessionTemplate savedTemplate = sevenDaySessionRepository.save(sevenDayTemplate);

        // Initialize the sessionTemplates list if it's null


        for (SessionTemplateInput sessionTemplateInput : data.getSessionTemplates()) {

            // Create and save SessionTemplate entities
            SessionTemplate sessionTemplate = new SessionTemplate();

            sessionTemplate.setSessionType(sessionTemplateInput.getSessionType());
            sessionTemplate.setLocation(sessionTemplateInput.getLocation());
            sessionTemplate.setTime(sessionTemplateInput.getTime());
            sessionTemplate.setDayOfTheWeek(sessionTemplateInput.getDayOfTheWeek());
            sessionTemplate.setSevenDaySessionTemplateId(savedTemplate.getId());


            sessionTemplateService.saveSessionTemplate(sessionTemplate);

            //add the saved seven day session template id to the sessionTemplate
            sevenDayTemplate.getSessionTemplates().add(sessionTemplate);

            // Create and save Session entities
            Session session = createSessionFromTemplateInput(sessionTemplateInput, weekStartDate);
            sessionRepository.save(session);
        }
        return savedTemplate;
    }

    private Session createSessionFromTemplateWithClubId(SessionTemplate sessionTemplate, LocalDateTime weekStartDate, Long clubId) {
        // Create a Session entity based on the SessionTemplate entity
        Session session = new Session();
        session.setSessionType(sessionTemplate.getSessionType());
        session.setLocation(sessionTemplate.getLocation());
        session.setClubId(clubId);
        session.setDuration(sessionTemplate.getDuration());

        // Calculate the date and time for the session
        LocalDate sessionDate = calculateSessionDate(weekStartDate, sessionTemplate.getDayOfTheWeek());
        LocalDateTime sessionDateTime = LocalDateTime.of(sessionDate, sessionTemplate.getTime().toLocalTime());
        session.setTime(sessionDateTime);

        // Set default values for booking, payment, and completion status
        session.setIsBooked(false);
        session.setIsPaidFor(false);
        session.setIsCompleted(false);

        // Return the populated Session object
        return session;
    }
    private Session createSessionFromTemplate(SessionTemplate sessionTemplate, LocalDateTime weekStartDate) {
        // Create a Session entity based on the SessionTemplate entity
        Session session = new Session();
        session.setSessionType(sessionTemplate.getSessionType());
        session.setLocation(sessionTemplate.getLocation());

        // Calculate the date and time for the session
        LocalDate sessionDate = calculateSessionDate(weekStartDate, sessionTemplate.getDayOfTheWeek());
        LocalDateTime sessionDateTime = LocalDateTime.of(sessionDate, sessionTemplate.getTime().toLocalTime());
        session.setTime(sessionDateTime);

        // Set default values for booking, payment, and completion status
        session.setIsBooked(false);
        session.setIsPaidFor(false);
        session.setIsCompleted(false);

        // Return the populated Session object
        return session;
    }
    private Session createSessionFromTemplateInput(SessionTemplateInput sessionTemplateInput, LocalDateTime weekStartDate) {

        Session session = new Session();
        session.setSessionType(sessionTemplateInput.getSessionType());
        session.setLocation(sessionTemplateInput.getLocation());

        // Extract the LocalTime part from the LocalDateTime
        LocalTime sessionTime = sessionTemplateInput.getTime().toLocalTime();

        // Convert the day of the week to the correct LocalDate based on the weekStartDate
        LocalDateTime sessionDateTime = calculateSessionDateTime(weekStartDate, sessionTemplateInput.getDayOfTheWeek(),sessionTime);
        session.setTime(sessionDateTime);

        // Assign default values for booking, payment, and completion status
        session.setIsBooked(false);
        session.setIsPaidFor(false);
        session.setIsCompleted(false);

        sessionRepository.save(session);

        // Return the populated Session object
        return session;
    }

    private LocalDateTime calculateSessionDateTime(LocalDateTime weekStartDate, int dayOfTheWeek, LocalTime sessionTime){
        DayOfWeek day = DayOfWeek.of(dayOfTheWeek);
        // Adjust the day of the week to the correct date of that week
        LocalDate sessionDate = weekStartDate.with(TemporalAdjusters.nextOrSame(day)).toLocalDate();

        // Combine the date with the time from the input
        return LocalDateTime.of(sessionDate, sessionTime);
    }
    private LocalDate calculateSessionDate(LocalDateTime weekStartDate, int dayOfTheWeek) {
        // Convert dayOfTheWeek int to DayOfWeek
        DayOfWeek day = DayOfWeek.of(dayOfTheWeek);
        // Adjust the day of the week to the correct date of that week
        return weekStartDate.with(TemporalAdjusters.nextOrSame(day)).toLocalDate();
    }

    @Transactional
    public SevenDaySessionTemplate createSevenDaySessionsTemplateFromClubId(SevenDaySessionTemplateInput data, Long clubId){
        if (data == null) {
            throw new IllegalArgumentException("Input cannot be null");
        }

        SevenDaySessionTemplate sevenDayTemplate = new SevenDaySessionTemplate();

        sevenDayTemplate.setTemplateName(data.getTemplateName());
        sevenDayTemplate.setCoach(data.getCoach());
        sevenDayTemplate.setClubId(clubId);

        SevenDaySessionTemplate savedTemplate = sevenDaySessionRepository.save(sevenDayTemplate);

        if (sevenDayTemplate.getSessionTemplates() == null) {
            sevenDayTemplate.setSessionTemplates(new ArrayList<>());
        }

        // Iterate through the list of SessionTemplateInput objects
        for (SessionTemplateInput sessionTemplateInput : data.getSessionTemplates()) {

            // Create a new SessionTemplate entity for each SessionTemplateInput
            SessionTemplate sessionTemplate = new SessionTemplate();

            sessionTemplate.setSessionType(sessionTemplateInput.getSessionType());
            sessionTemplate.setLocation(sessionTemplateInput.getLocation());
            sessionTemplate.setTime(sessionTemplateInput.getTime());
            sessionTemplate.setDuration(sessionTemplateInput.getDuration());
            sessionTemplate.setSevenDaySessionTemplateId(savedTemplate.getId()); // Associate with the seven-day template
            sessionTemplate.setClubId(clubId);
            sessionTemplate.setDayOfTheWeek(sessionTemplateInput.getDayOfTheWeek());
            sessionTemplateService.saveSessionTemplate(sessionTemplate);
            sevenDayTemplate.getSessionTemplates().add(sessionTemplate);

        }
        // Only save the template, without creating sessions
        return sevenDaySessionRepository.save(sevenDayTemplate);
    }

    @Transactional
    public SevenDaySessionTemplate createSevenDaySessionTemplateWithoutSessions(SevenDaySessionTemplateInput data, Long clubId, Long coachId) {

        if (data == null) {
            throw new IllegalArgumentException("Input cannot be null");
        }


        SevenDaySessionTemplate sevenDayTemplate = new SevenDaySessionTemplate();

        sevenDayTemplate.setTemplateName(data.getTemplateName());
        sevenDayTemplate.setCoach(data.getCoach());
        sevenDayTemplate.setCoachId(coachId);
        sevenDayTemplate.setClubId(clubId);
        SevenDaySessionTemplate savedTemplate = sevenDaySessionRepository.save(sevenDayTemplate);

        if (sevenDayTemplate.getSessionTemplates() == null) {
            sevenDayTemplate.setSessionTemplates(new ArrayList<>());
        }

        // Iterate through the list of SessionTemplateInput objects
        for (SessionTemplateInput sessionTemplateInput : data.getSessionTemplates()) {

            // Create a new SessionTemplate entity for each SessionTemplateInput
            SessionTemplate sessionTemplate = new SessionTemplate();

            sessionTemplate.setSessionType(sessionTemplateInput.getSessionType());
            sessionTemplate.setLocation(sessionTemplateInput.getLocation());
            sessionTemplate.setTime(sessionTemplateInput.getTime());
            sessionTemplate.setSevenDaySessionTemplateId(savedTemplate.getId()); // Associate with the seven-day template
            sessionTemplate.setDayOfTheWeek(sessionTemplateInput.getDayOfTheWeek());

            // Fetch and set the SevenDaySessionTemplate
//            sevenDaySessionRepository.findById(sessionTemplateInput.getSevenDayTemplateId())
//                    .orElseThrow(() -> new RuntimeException("SevenDaySessionTemplate not found"));
//            sessionTemplate.setSevenDaySessionTemplate(sevenDayTemplate);

            // Save the session template to the repository
            // Assuming you have a method in SessionTemplateService to save a SessionTemplate
            sessionTemplateService.saveSessionTemplate(sessionTemplate);
            sevenDayTemplate.getSessionTemplates().add(sessionTemplate);
        }
        // Only save the template, without creating sessions
        return sevenDaySessionRepository.save(sevenDayTemplate);
    }


    @Transactional
    public SevenDaySessionTemplate updateSevenDaySessionTemplate(Long templateId, SevenDaySessionTemplateInput updatedData) {
        SevenDaySessionTemplate existingTemplate = sevenDaySessionRepository.findById(templateId)
                .orElseThrow(() -> new RuntimeException("Template not found with id: " + templateId));

        existingTemplate.setTemplateName(updatedData.getTemplateName());
        existingTemplate.setCoach(updatedData.getCoach());

        updateRelatedSessionTemplates(existingTemplate, updatedData.getSessionTemplates());

        return sevenDaySessionRepository.save(existingTemplate);
    }


    private void updateRelatedSessionTemplates(SevenDaySessionTemplate sevenDayTemplate, List<SessionTemplateInput> updatedSessions) {
        // Fetch all current session templates associated with the sevenDayTemplate
        List<SessionTemplate> currentSessions = sessionTemplateService.findAllBySevenDayTemplateId(sevenDayTemplate.getId());
        Set<Long> currentSessionIds = currentSessions.stream()
                .map(SessionTemplate::getId)
                .collect(Collectors.toSet());

        for (SessionTemplateInput updatedSessionInput : updatedSessions) {
            Optional<SessionTemplate> existingSessionOpt = currentSessions.stream()
                    .filter(session -> session.getSessionType().equals(updatedSessionInput.getSessionType()) &&
                            session.getLocation().equals(updatedSessionInput.getLocation()) &&
                            session.getDayOfTheWeek() == updatedSessionInput.getDayOfTheWeek())
                    .findFirst();

            if (existingSessionOpt.isPresent()) {
                SessionTemplate existingSession = existingSessionOpt.get();
                sessionTemplateService.updateExistingSession(existingSession, updatedSessionInput);
                currentSessionIds.remove(existingSession.getId());
            }
            else {

                // Create a new SessionTemplate entity for each SessionTemplateInput
                SessionTemplate sessionTemplate = new SessionTemplate();

                sessionTemplate.setSessionType(updatedSessionInput.getSessionType());
                sessionTemplate.setLocation(updatedSessionInput.getLocation());
                sessionTemplate.setTime(updatedSessionInput.getTime());
//                sessionTemplate.setSevenDaySessionTemplate(savedTemplate); // Associate with the seven-day template

//                 If no existing session, create a new one
//                SessionTemplate newSession = createSessionFromTemplate(updatedSessionInput, sevenDayTemplate);
                sessionTemplateService.saveSessionTemplate(sessionTemplate);
            }
        }

        // Delete any sessions that were not in the updated list
        currentSessionIds.forEach(sessionTemplateService::deleteSessionTemplate);
    }

}