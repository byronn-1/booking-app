//package com.byronn.lee.coachingsessionbookinggraphql.service;
//
//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//import com.byronn.lee.coachingsessionbookinggraphql.entity.*;
//import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionRepository;
//import com.byronn.lee.coachingsessionbookinggraphql.repository.SevenDaySessionTemplateRepository;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.ArgumentCaptor;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.dao.DataAccessException;
//
//import java.time.DayOfWeek;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.Collections;
//import java.util.List;
//
//@ExtendWith(MockitoExtension.class)
//class SevenDaySessionTemplateServiceTest {
//
//    @Mock
//    private SevenDaySessionTemplateRepository sevenDaySessionRepository;
//
//    @Mock
//    private SessionTemplateService sessionTemplateService;
//
//    @Mock
//    private SessionRepository sessionRepository;
//
//    @InjectMocks
//    private SevenDaySessionTemplateService sevenDaySessionTemplateService;
//
//    @Test
//    @DisplayName("Create Seven Day Sessions Template with Empty Session Template List Should Handle Gracefully")
//    void createSevenDaySessionsTemplate() {
//        // Arrange
//        SessionTemplate mockSessionTemplate1 = new SessionTemplate();
//        mockSessionTemplate1.setDayOfTheWeek(1);
//
//        SessionTemplate mockSessionTemplate2 = new SessionTemplate();
//        mockSessionTemplate2.setDayOfTheWeek(2);
//
//        SevenDaySessionTemplateInput input = new SevenDaySessionTemplateInput(1L, "TemplateName", "CoachName", Arrays.asList(
//                new SessionTemplateInput("SessionType1", "Location1", LocalDateTime.now(), mockSessionTemplate1),
//                new SessionTemplateInput("SessionType2", "Location2", LocalDateTime.now(), mockSessionTemplate2)
//        ));
//
//        SevenDaySessionTemplate savedTemplate = new SevenDaySessionTemplate(1L, "TemplateName", "CoachName", new ArrayList<>());
//        when(sevenDaySessionRepository.save(any(SevenDaySessionTemplate.class))).thenReturn(savedTemplate);
//
//        // Act
//        SevenDaySessionTemplate result = sevenDaySessionTemplateService.createSevenDaySessionsTemplate(input);
//
//        // Assert
//        assertNotNull(result);
//        assertEquals(1L, result.getId());
//        verify(sevenDaySessionRepository).save(any(SevenDaySessionTemplate.class));
//        verify(sessionTemplateService, times(input.getSessionTemplates().size())).saveSessionTemplate(any(SessionTemplate.class));
//        verify(sessionRepository, times(input.getSessionTemplates().size())).save(any(Session.class));
//    }
//
//    @Test
//    @DisplayName("Create Seven Day Sessions Template with Null Input Should Throw Exception")
//    void createSevenDaySessionsTemplate_WithEmptySessionTemplateList_ShouldHandleGracefully() {
//        // Arrange
//        SevenDaySessionTemplateInput input = new SevenDaySessionTemplateInput(1L, "TemplateName", "CoachName", Collections.emptyList());
//
//        SevenDaySessionTemplate savedTemplate = new SevenDaySessionTemplate(1L, "TemplateName", "CoachName", new ArrayList<>());
//        when(sevenDaySessionRepository.save(any(SevenDaySessionTemplate.class))).thenReturn(savedTemplate);
//
//        // Act
//        SevenDaySessionTemplate result = sevenDaySessionTemplateService.createSevenDaySessionsTemplate(input);
//
//        // Assert
//        assertNotNull(result);
//        assertTrue(result.getSessionTemplates().isEmpty());
//        verify(sevenDaySessionRepository).save(any(SevenDaySessionTemplate.class));
//        verify(sessionTemplateService, never()).saveSessionTemplate(any(SessionTemplate.class));
//        verify(sessionRepository, never()).save(any(Session.class));
//    }
//
//    @Test
//    @DisplayName("Create Seven Day Sessions Template When Persistence Fails Should Throw Exception")
//    void createSevenDaySessionsTemplate_WithNullInput_ShouldThrowException() {
//        assertThrows(IllegalArgumentException.class, () -> {
//            sevenDaySessionTemplateService.createSevenDaySessionsTemplate(null);
//        });
//    }
//
//    @Test
//    @DisplayName("Create Seven Day Sessions Template Should Correctly Map Data To Entities")
//    void createSevenDaySessionsTemplate_PersistenceFails_ShouldThrowException() {
//        SevenDaySessionTemplateInput input = new SevenDaySessionTemplateInput(1L, "TemplateName", "CoachName", Arrays.asList(
//                new SessionTemplateInput("SessionType1", "Location1", LocalDateTime.now(), null),
//                new SessionTemplateInput("SessionType2", "Location2", LocalDateTime.now(), null)
//        ));
//        when(sevenDaySessionRepository.save(any(SevenDaySessionTemplate.class)))
//                .thenThrow(new DataAccessException("Database error") {});
//
//        assertThrows(DataAccessException.class, () -> {
//            sevenDaySessionTemplateService.createSevenDaySessionsTemplate(input);
//        });
//    }
//    @Test
//    @DisplayName("Create Seven Day Sessions Template Should Correctly Handle Dates And Times")
//    void createSevenDaySessionsTemplate_ShouldCorrectlyMapDataToEntities() {
//        // Arrange
//        LocalDateTime testTime = LocalDateTime.now();
//
//
//        SessionTemplate stubSessionTemplate1 = new SessionTemplate();
//        stubSessionTemplate1.setDayOfTheWeek(DayOfWeek.MONDAY.getValue());
//        SessionTemplate stubSessionTemplate2 = new SessionTemplate();
//        stubSessionTemplate2.setDayOfTheWeek(DayOfWeek.TUESDAY.getValue());
//
//        SevenDaySessionTemplateInput input = new SevenDaySessionTemplateInput(1L, "TemplateName", "CoachName", Arrays.asList(
//                new SessionTemplateInput("SessionType1", "Location1", testTime, stubSessionTemplate1),
//                new SessionTemplateInput("SessionType2", "Location2", testTime, stubSessionTemplate2)
//        ));
//
//
//
//        SevenDaySessionTemplate savedTemplate = new SevenDaySessionTemplate(1L, "TemplateName", "CoachName", new ArrayList<>());
//        when(sevenDaySessionRepository.save(any(SevenDaySessionTemplate.class))).thenReturn(savedTemplate);
//
//        // Act
//        sevenDaySessionTemplateService.createSevenDaySessionsTemplate(input);
//
//        // Assert
//        ArgumentCaptor<SessionTemplate> sessionTemplateCaptor = ArgumentCaptor.forClass(SessionTemplate.class);
//        verify(sessionTemplateService, times(input.getSessionTemplates().size())).saveSessionTemplate(sessionTemplateCaptor.capture());
//
//        List<SessionTemplate> capturedSessionTemplates = sessionTemplateCaptor.getAllValues();
//        for (int i = 0; i < input.getSessionTemplates().size(); i++) {
//            SessionTemplateInput inputTemplate = input.getSessionTemplates().get(i);
//            SessionTemplate capturedTemplate = capturedSessionTemplates.get(i);
//
//            assertEquals(inputTemplate.getSessionType(), capturedTemplate.getSessionType());
//            assertEquals(inputTemplate.getLocation(), capturedTemplate.getLocation());
//            assertEquals(inputTemplate.getTime(), capturedTemplate.getTime());
//        }
//    }
//
//
//}
