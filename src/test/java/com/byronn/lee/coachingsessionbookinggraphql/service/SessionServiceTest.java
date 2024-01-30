/*
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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

    @Test
    public void testGetSessionsByDay() {
        // Arrange
        LocalDate testDate = LocalDate.of(2023, 12, 6);
        LocalDateTime startOfDay = testDate.atStartOfDay();
        LocalDateTime endOfDay = testDate.atTime(LocalTime.MAX);

        List<Session> expectedSessions = Arrays.asList(new Session(), new Session()); // Assuming Session objects are initialized as needed
        when(sessionRepository.findByTimeBetween(startOfDay, endOfDay)).thenReturn(expectedSessions);

        // Act
        List<Session> actualSessions = sessionService.getSessionsByDay(testDate);

        // Assert
        assertEquals(expectedSessions.size(), actualSessions.size(), "Number of sessions should match");
        assertEquals(expectedSessions, actualSessions, "Returned sessions should match the expected sessions");
        verify(sessionRepository).findByTimeBetween(startOfDay, endOfDay); // Verify correct method call
    }

    @Test
    public void testGetSessionsByDayWithNoSessions() {
        // Arrange
        LocalDate testDate = LocalDate.of(2023, 12, 6);
        LocalDateTime startOfDay = testDate.atStartOfDay();
        LocalDateTime endOfDay = testDate.atTime(LocalTime.MAX);

        when(sessionRepository.findByTimeBetween(startOfDay, endOfDay)).thenReturn(Collections.emptyList());

        // Act
        List<Session> actualSessions = sessionService.getSessionsByDay(testDate);

        // Assert
        assertTrue(actualSessions.isEmpty(), "List of sessions should be empty");
        verify(sessionRepository).findByTimeBetween(startOfDay, endOfDay); // Verify correct method call
    }

    @Test
    public void testGetSessionsByFutureDate() {
        // Arrange
        LocalDate futureDate = LocalDate.now().plusYears(1);
        LocalDateTime startOfDay = futureDate.atStartOfDay();
        LocalDateTime endOfDay = futureDate.atTime(LocalTime.MAX);

        when(sessionRepository.findByTimeBetween(startOfDay, endOfDay)).thenReturn(Collections.emptyList());

        // Act
        List<Session> actualSessions = sessionService.getSessionsByDay(futureDate);

        // Assert
        assertTrue(actualSessions.isEmpty(), "List of sessions for a future date should be empty");
        verify(sessionRepository).findByTimeBetween(startOfDay, endOfDay); // Verify correct method call
    }
    @Test
    public void testGetSessionsByWeek() {
        // Arrange
        LocalDate startOfWeekDate = LocalDate.of(2023, 12, 1); // Assuming this is the start of the week
        LocalDateTime start = startOfWeekDate.atStartOfDay();
        LocalDateTime end = startOfWeekDate.plusWeeks(1).atStartOfDay();

        List<Session> expectedSessions = Arrays.asList(
                createSession(start.plusDays(1)),
                createSession(start.plusDays(3)),
                createSession(start.plusDays(2))
        );
        when(sessionRepository.findByTimeBetween(start, end)).thenReturn(expectedSessions);

        // Act
        List<Session> actualSessions = sessionService.getSessionsByWeek(startOfWeekDate);

        // Assert
        assertNotNull(actualSessions, "Session list should not be null");
        assertEquals(expectedSessions.size(), actualSessions.size(), "Session list size should match");
        assertEquals(
                expectedSessions.stream().sorted(Comparator.comparing(Session::getTime)).collect(Collectors.toList()),
                actualSessions,
                "Sessions should be sorted by time"
        );
        verify(sessionRepository).findByTimeBetween(start, end);
    }

    private Session createSession(LocalDateTime time) {
        Session session = new Session();
        session.setTime(time);
        // Set other properties as needed
        return session;
    }
    @Test
    public void testGetSessionsByWeekWithNoSessions() {
        // Arrange
        LocalDate startOfWeekDate = LocalDate.of(2023, 12, 1);
        LocalDateTime start = startOfWeekDate.atStartOfDay();
        LocalDateTime end = startOfWeekDate.plusWeeks(1).atStartOfDay();

        when(sessionRepository.findByTimeBetween(start, end)).thenReturn(Collections.emptyList());

        // Act
        List<Session> actualSessions = sessionService.getSessionsByWeek(startOfWeekDate);

        // Assert
        assertTrue(actualSessions.isEmpty(), "List of sessions should be empty");
        verify(sessionRepository).findByTimeBetween(start, end);
    }
    @Test
    public void testGetSessionsByWeekWithBorderlineDates() {
        // Arrange
        LocalDate startOfWeekDate = LocalDate.of(2023, 12, 31); // A date close to the end of the year
        LocalDateTime start = startOfWeekDate.atStartOfDay();
        LocalDateTime end = startOfWeekDate.plusWeeks(1).atStartOfDay();

        List<Session> expectedSessions = Arrays.asList(createSession(start), createSession(end.minusSeconds(1)));
        when(sessionRepository.findByTimeBetween(start, end)).thenReturn(expectedSessions);

        // Act
        List<Session> actualSessions = sessionService.getSessionsByWeek(startOfWeekDate);

        // Assert
        assertNotNull(actualSessions, "Session list should not be null");
        assertEquals(2, actualSessions.size(), "Session list should contain two sessions");
        assertEquals(expectedSessions.get(0), actualSessions.get(0));
        assertEquals(expectedSessions.get(1), actualSessions.get(1));
        verify(sessionRepository).findByTimeBetween(start, end);
    }

}
*/
