package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplate;
import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplateInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionTemplateRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SessionTemplateService {
    private final SessionTemplateRepository sessionTemplateRepository;

    public SessionTemplateService(SessionTemplateRepository sessionTemplateRepository) {
        this.sessionTemplateRepository = sessionTemplateRepository;
    }

    public List<SessionTemplate> findAllBySevenDayTemplateId(Long sevenDayTemplateId) {
        if (sevenDayTemplateId == null) {
            throw new IllegalArgumentException("Seven day template ID must not be null");
        }
        try {
            return sessionTemplateRepository.findAllBySevenDaySessionTemplateId(sevenDayTemplateId);
        } catch (DataAccessException e) {
            // Log error, handle exception, or rethrow as a custom exception
            throw e;
        }
    }

    @Transactional
    public void saveSessionTemplate(SessionTemplate sessionTemplate) {
        if (sessionTemplate == null) {
            throw new IllegalArgumentException("Session template must not be null");
        }
        try {
            sessionTemplateRepository.save(sessionTemplate);
        } catch (DataAccessException e) {
            // Log error, handle exception, or rethrow as a custom exception
            throw e;
        }
    }

    @Transactional
    public void deleteSessionTemplate(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Session template ID must not be null");
        }
        try {
            sessionTemplateRepository.deleteById(id);
        } catch (DataAccessException e) {
            // Log error, handle exception, or rethrow as a custom exception
            throw e;
        }
    }

    @Transactional
    public void updateExistingSession(SessionTemplate existingSession, SessionTemplateInput updatedSessionInput) {
        if (existingSession == null || updatedSessionInput == null) {
            throw new IllegalArgumentException("Existing session and updated session input must not be null");
        }

        // Update the properties of the existing session template with values from the updatedSessionInput
        existingSession.setSessionType(updatedSessionInput.getSessionType());
        existingSession.setLocation(updatedSessionInput.getLocation());
        // existingSession.setDayOfTheWeek(updatedSessionInput.getDayOfTheWeek()); // Uncomment and use if applicable
        existingSession.setTime(updatedSessionInput.getTime());

        // Save the updated session template to the repository
        try {
            sessionTemplateRepository.save(existingSession);
        } catch (DataAccessException e) {
            // Log error, handle exception, or rethrow as a custom exception
            throw e;
        }
    }
}
