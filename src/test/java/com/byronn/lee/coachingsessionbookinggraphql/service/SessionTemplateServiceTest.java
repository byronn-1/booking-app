//package com.byronn.lee.coachingsessionbookinggraphql.service;
//
//import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplate;
//import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplateInput;
//import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionTemplateRepository;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import java.time.LocalDateTime;
//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//@ExtendWith(MockitoExtension.class)
//class SessionTemplateServiceTest {
//
//    @Mock
//    private SessionTemplateRepository sessionTemplateRepository;
//
//    @InjectMocks
//    private SessionTemplateService sessionTemplateService;
//
//    @Test
//    void saveSessionTemplate() {
//        SessionTemplate sessionTemplate = new SessionTemplate();
//        // Set properties for sessionTemplate as needed
//
//        sessionTemplateService.saveSessionTemplate(sessionTemplate);
//
//        verify(sessionTemplateRepository).save(sessionTemplate);
//    }
//
//    @Test
//    void deleteSessionTemplate() {
//        Long sessionId = 1L;
//
//        sessionTemplateService.deleteSessionTemplate(sessionId);
//
//        verify(sessionTemplateRepository).deleteById(sessionId);
//    }
//
//    @Test
//    void updateExistingSession() {
//        SessionTemplate existingSession = new SessionTemplate();
//        // Initialize existingSession properties
//
//        SessionTemplateInput updatedSessionInput = new SessionTemplateInput("newType", "newLocation", LocalDateTime.now(), null);
//        // Set other properties of updatedSessionInput as needed
//
//        when(sessionTemplateRepository.save(any(SessionTemplate.class))).thenReturn(existingSession);
//
//        sessionTemplateService.updateExistingSession(existingSession, updatedSessionInput);
//
//        verify(sessionTemplateRepository).save(existingSession);
//        assertEquals("newType", existingSession.getSessionType());
//        assertEquals("newLocation", existingSession.getLocation());
//        // Add other assertions as needed
//    }
//}
