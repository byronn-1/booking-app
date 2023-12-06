package com.byronn.lee.coachingsessionbookinggraphql.service;
import com.byronn.lee.coachingsessionbookinggraphql.entity.Session;
import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SessionRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ExtendWith(MockitoExtension.class)
public class SessionServiceTest {

    @Mock
    SessionRepository sessionRepository;

    @InjectMocks
    SessionService sessionService;

    @DisplayName("should successfully create and save a new Session based on SessionInput data")
    @Test
    public void testCreateNewSession(){
        LocalDateTime testTime = LocalDateTime.parse("2023-12-06T11:43:11.664643", DateTimeFormatter.ISO_LOCAL_DATE_TIME);
       SessionInput sessionInput = new SessionInput("Maths", "math lab", testTime, false, false, false, 1L );

        Session expectedSession = new Session();
        expectedSession.setSessionType(sessionInput.getSessionType());
        expectedSession.setLocation(sessionInput.getLocation());
        expectedSession.setTime(sessionInput.getTime());
        expectedSession.setIsBooked(sessionInput.getIsBooked());
        expectedSession.setIsPaidFor(sessionInput.getIsPaidFor());
        expectedSession.setIsCompleted(sessionInput.getIsCompleted());

        when(sessionRepository.save(argThat(session ->
                session.getSessionType().equals("Maths") &&
                        session.getLocation().equals("math lab") &&
                        session.getTime().equals(testTime)))).thenReturn(expectedSession);



        // Act
        Session actualSession = sessionService.createSession(sessionInput);

        // Assert
        assertEquals(expectedSession.getSessionType(), actualSession.getSessionType());
        assertEquals(expectedSession.getLocation(), actualSession.getLocation());
        assertEquals(expectedSession.getTime(), actualSession.getTime());
        assertEquals(expectedSession.getIsBooked(), actualSession.getIsBooked());
        assertEquals(expectedSession.getIsPaidFor(), actualSession.getIsPaidFor());
        assertEquals(expectedSession.getIsCompleted(), actualSession.getIsCompleted());

        verify(sessionRepository).save(argThat(session ->
                session.getSessionType().equals("Maths") &&
                        session.getLocation().equals("math lab") &&
                        session.getTime().equals(testTime))); // Verify save is called

    }

    @Test
    public void testInputValidationWithNullInput() {
        // Arrange
        SessionInput sessionInput = null;

        // Act & Assert
        assertThrows(NullPointerException.class, () -> {
            sessionService.createSession(sessionInput);
        }, "Should throw NullPointerException for null input");

        verify(sessionRepository, never()).save(any(Session.class)); // Ensure save is never called
    }

    @Test
    public void testRepositoryInteractionWithException() {
        // Arrange
        SessionInput sessionInput = new SessionInput("Math", "Room 101", LocalDateTime.now(), false, true, false, 1L);
        when(sessionRepository.save(any(Session.class))).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            sessionService.createSession(sessionInput);
        }, "Should propagate the RuntimeException from the repository");

        verify(sessionRepository).save(any(Session.class)); // Ensure save is called
    }

    @Test
    public void testDateParsingWithValidDate() {
        // Arrange
        LocalDateTime testTime = LocalDateTime.parse("2023-12-06T10:00:00");
        SessionInput sessionInput = new SessionInput("Math", "Room 101", testTime, false, true, false, 1L);

        Session expectedSession = new Session(); // Make sure this is properly initialized
        expectedSession.setTime(testTime);
        when(sessionRepository.save(any(Session.class))).thenReturn(expectedSession);

        // Act
        Session resultSession = sessionService.createSession(sessionInput);

        // Assert
        assertNotNull(resultSession, "Result session should not be null");
        assertEquals(testTime, resultSession.getTime(), "The session time should match the input time");
    }

    @Test
    public void testEdgeCaseWithFutureDate() {
        // Arrange
        LocalDateTime futureTime = LocalDateTime.now().plusYears(10); // A date far in the future
        SessionInput sessionInput = new SessionInput("Math", "Room 101", futureTime, false, true, false, 1L);

        // Act
        Session resultSession = sessionService.createSession(sessionInput);

        // Assert
        assertEquals(futureTime, resultSession.getTime(), "The session time should be a future date");
    }

}
