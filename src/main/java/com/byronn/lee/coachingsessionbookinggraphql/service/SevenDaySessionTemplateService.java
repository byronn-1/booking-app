package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.*;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionRepository;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SevenDaySessionTemplateRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class SevenDaySessionTemplateService {


    private final SevenDaySessionTemplateRepository sevenDaySessionRepository;
    private final SessionTemplateService sessionTemplateService;
    private final SessionRepository sessionRepository;
    public SevenDaySessionTemplateService(SevenDaySessionTemplateRepository sevenDaySessionRepository,SessionRepository sessionRepository, SessionTemplateService sessionTemplateService){
        this.sevenDaySessionRepository = sevenDaySessionRepository;
        this.sessionRepository = sessionRepository;
        this.sessionTemplateService = sessionTemplateService;
    }


    @Transactional
    public List<SevenDaySessionTemplate> getAllSevenDaySessionTemplates(){
        return sevenDaySessionRepository.findAll();
    }

    @Transactional
    public SevenDaySessionTemplate createSevenDaySessionsTemplate(SevenDaySessionTemplateInput data, LocalDate weekStartDate) {

        if (data == null) {
            throw new IllegalArgumentException("Input cannot be null");
        }

        SevenDaySessionTemplate sevenDayTemplate = new SevenDaySessionTemplate();

        sevenDayTemplate.setTemplateName(data.getTemplateName());
        sevenDayTemplate.setCoach(data.getCoach());

        SevenDaySessionTemplate savedTemplate = sevenDaySessionRepository.save(sevenDayTemplate);


        for (SessionTemplateInput sessionTemplateInput : data.getSessionTemplates()) {

            // Create and save SessionTemplate entities
            SessionTemplate sessionTemplate = new SessionTemplate();

            sessionTemplate.setSessionType(sessionTemplateInput.getSessionType());
            sessionTemplate.setLocation(sessionTemplateInput.getLocation());
            sessionTemplate.setTime(sessionTemplateInput.getTime());
            sessionTemplate.setDayOfTheWeek(sessionTemplateInput.getDayOfTheWeek());
            sessionTemplate.setSevenDaySessionTemplateId(savedTemplate.getId());
//            sessionTemplate.setSevenDaySessionTemplate(savedTemplate);
//            sessionTemplateService.saveSessionTemplate(sessionTemplate);

//            SevenDaySessionTemplate associatedTemplate = sevenDaySessionRepository.findById(sessionTemplateInput.getSevenDayTemplateId()).orElse(null);
//            sessionTemplate.setSevenDaySessionTemplate(associatedTemplate);

            sessionTemplateService.saveSessionTemplate(sessionTemplate);

            // Create and save Session entities
            Session session = createSessionFromTemplate(sessionTemplateInput, savedTemplate, weekStartDate);
            sessionRepository.save(session);
        }

        return savedTemplate;
    }

    private Session createSessionFromTemplate(SessionTemplateInput sessionTemplateInput, SevenDaySessionTemplate sevenDayTemplate, LocalDate weekStartDate) {

        Session session = new Session();
        session.setSessionType(sessionTemplateInput.getSessionType());
        session.setLocation(sessionTemplateInput.getLocation());

        // Convert the day of the week to the correct LocalDate based on the weekStartDate
        LocalDate sessionDate = calculateSessionDate(weekStartDate, sessionTemplateInput.getDayOfTheWeek());

        // Combine the date with the time from the input
        LocalDateTime sessionDateTime = LocalDateTime.of(sessionDate, sessionTemplateInput.getTime().toLocalTime());
        session.setTime(sessionDateTime);

        // Assign default values for booking, payment, and completion status
        session.setIsBooked(false);
        session.setIsPaidFor(false);
        session.setIsCompleted(false);

        sessionRepository.save(session);

        // Return the populated Session object
        return session;
    }

    private LocalDate calculateSessionDate(LocalDate weekStartDate, int dayOfTheWeek) {
        // Convert dayOfTheWeek int to DayOfWeek
        DayOfWeek day = DayOfWeek.of(dayOfTheWeek);
        // Adjust the day of the week to the correct date of that week
        return weekStartDate.with(TemporalAdjusters.nextOrSame(day));
    }

    @Transactional
    public SevenDaySessionTemplate createSevenDaySessionTemplateWithoutSessions(SevenDaySessionTemplateInput data) {
        SevenDaySessionTemplate sevenDayTemplate = new SevenDaySessionTemplate();
        sevenDayTemplate.setTemplateName(data.getTemplateName());
        sevenDayTemplate.setCoach(data.getCoach());

        SevenDaySessionTemplate savedTemplate = sevenDaySessionRepository.save(sevenDayTemplate);
        // Iterate through the list of SessionTemplateInput objects
        for (SessionTemplateInput sessionTemplateInput : data.getSessionTemplates()) {

            // Create a new SessionTemplate entity for each SessionTemplateInput
            SessionTemplate sessionTemplate = new SessionTemplate();

            sessionTemplate.setSessionType(sessionTemplateInput.getSessionType());
            sessionTemplate.setLocation(sessionTemplateInput.getLocation());
            sessionTemplate.setTime(sessionTemplateInput.getTime());
            sessionTemplate.setSevenDaySessionTemplateId(savedTemplate.getId()); // Associate with the seven-day template

            // Fetch and set the SevenDaySessionTemplate
//            sevenDaySessionRepository.findById(sessionTemplateInput.getSevenDayTemplateId())
//                    .orElseThrow(() -> new RuntimeException("SevenDaySessionTemplate not found"));
//            sessionTemplate.setSevenDaySessionTemplate(sevenDayTemplate);

            // Save the session template to the repository
            // Assuming you have a method in SessionTemplateService to save a SessionTemplate
            sessionTemplateService.saveSessionTemplate(sessionTemplate);
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