package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplate;
import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplateInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SessionTemplateService {
    private final SessionTemplateRepository sessionTemplateRepository;

    public SessionTemplateService(SessionTemplateRepository sessionTemplateRepository) {
        this.sessionTemplateRepository = sessionTemplateRepository;
    }

    public Optional<SessionTemplate> findSessionTemplateBySevenDayTemplateId(Long sessionId) {
        return sessionTemplateRepository.findAllBySevenDayTemplateId(sessionId);
    }

    public SessionTemplate saveSessionTemplate(SessionTemplate sessionTemplate) {
        return sessionTemplateRepository.save(sessionTemplate);
    }

    public void deleteSessionTemplate(Long id) {
        sessionTemplateRepository.deleteById(id);
    }

    public void updateExistingSession(SessionTemplate existingSession, SessionTemplateInput updatedSessionInput) {
        // Update the properties of the existing session template with values from the updatedSessionInput.
        // Assume that SessionTemplateInput has fields similar to SessionTemplate entity and appropriate getter methods.

        existingSession.setSessionType(updatedSessionInput.getSessionType());
        existingSession.setLocation(updatedSessionInput.getLocation());
        existingSession.setDayOfTheWeek(updatedSessionInput.getDayOfTheWeek());

        // Assuming that SessionTemplateInput has a time field of type LocalTime or similar
        existingSession.setTime(updatedSessionInput.getTime());

        // Any other properties that need to be updated should be set here.
        // ...

        // Save the updated session template to the repository.
        sessionTemplateRepository.save(existingSession);
    }
}
