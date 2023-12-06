package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.*;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionRepository;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SevenDaySessionTemplateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;


@Service
public class SevenDaySessionTemplateService {


    private final SevenDaySessionTemplateRepository sevenDaySessionRepository;
    private final SessionRepository sessionRepository;
    public SevenDaySessionTemplateService(SevenDaySessionTemplateRepository sevenDaySessionRepository,SessionRepository sessionRepository){
        this.sevenDaySessionRepository = sevenDaySessionRepository;
        this.sessionRepository = sessionRepository;
    }




    @Transactional
    public SevenDaySessionTemplate createSevenDaySessionTemplate(SevenDaySessionTemplateInput data) {

        SevenDaySessionTemplate sevenDayTemplate = new SevenDaySessionTemplate();
        sevenDayTemplate.setTemplateName(data.getTemplateName());
        sevenDayTemplate.setCoach(data.getCoach());

        sevenDayTemplate = sevenDaySessionRepository.save(sevenDayTemplate);
        LocalDate weekStartDate = LocalDate.now();
        for (SessionTemplateInput sessionTemplateInput : data.getSessionTemplates()) {
            Session session = createSessionFromTemplate(sessionTemplateInput, sevenDayTemplate, weekStartDate);
            sessionRepository.save(session);
        }

        return sevenDayTemplate;
    }

    private Session createSessionFromTemplate(SessionTemplateInput sessionTemplateInput, SevenDaySessionTemplate sevenDayTemplate, LocalDate weekStartDate) {
        Session session = new Session();
        session.setSessionType(sessionTemplateInput.getSessionType());
        session.setLocation(sessionTemplateInput.getLocation());

        // Extract the time part from the LocalDateTime
        LocalTime sessionTime = sessionTemplateInput.getTime().toLocalTime();

        // Calculate the date and time for the session
        LocalDate sessionDate = calculateSessionDate(weekStartDate, sessionTemplateInput.getSessionTemplate().getDayOfTheWeek());
        LocalDateTime sessionDateTime = LocalDateTime.of(sessionDate, sessionTime);
        session.setTime(sessionDateTime);

        // `isBooked`, `isPaidFor`, etc., set them
        // ...

        return session;
    }

    private LocalDate calculateSessionDate(LocalDate weekStartDate, int dayOfTheWeek) {
        // Convert dayOfTheWeek int to DayOfWeek
        DayOfWeek day = DayOfWeek.of(dayOfTheWeek);
        // Adjust the day of the week to the correct date of that week
        return weekStartDate.with(TemporalAdjusters.nextOrSame(day));
    }
}