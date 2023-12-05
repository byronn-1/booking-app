package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.*;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionRepository;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SevenDaySessionTemplateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class SevenDaySessionTemplateService {

/*    @Autowired
    private SevenDaySessionTemplateRepository sevenDaySessionRepository;*/

    SevenDaySessionTemplateRepository sevenDaySessionRepository = new  SevenDaySessionTemplateRepository();
    @Autowired
    private SessionRepository sessionRepository;
    @Transactional
    public SevenDaySessionTemplate createSevenDaySessionTemplate(SevenDaySessionTemplateInput data) {

        SevenDaySessionTemplate sevenDayTemplate = new SevenDaySessionTemplate();
        sevenDayTemplate.setTemplateName(data.getTemplateName());
        sevenDayTemplate.setCoach(data.getCoach());

        sevenDayTemplate = sevenDaySessionRepository.save(sevenDayTemplate);

        for (SessionTemplateInput sessionTemplateInput : data.getSessionTemplates()) {
            Session session = createSessionFromTemplate(sessionTemplateInput, sevenDayTemplate);
            sessionRepository.save(session);
        }

        return sevenDayTemplate;
    }

    private Session createSessionFromTemplate(SessionTemplateInput sessionTemplateInput, SevenDaySessionTemplate sevenDayTemplate) {
        Session session = new Session();
        session.setSessionType(sessionTemplateInput.getSessionType());
        session.setLocation(sessionTemplateInput.getLocation());
        // Add logic to calculate the specific date and time for the session
        // based on the dayOfWeek, time, and possibly the start date of the sevenDayTemplate
        session.setDayOfWeek(sessionTemplateInput.getDayOfWeek());
        session.setTime(sessionTemplateInput.getTime());

        return session;
    }
}