package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Session;
import com.byronn.lee.coachingsessionbookinggraphql.service.SessionService;
import org.springframework.stereotype.Component;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

/*
 * This Controller operates on the Session service and facilitates the reading of Session listings in the Session SQL table.
 */
@Controller
public class SessionQueryResolver {
    private final SessionService sessionService;

    public SessionQueryResolver(SessionService sessionService){
        this.sessionService = sessionService;
    }

    /*
     * allSessions accepts no parameters and returns the entire collection of Sessions in the Sessions SQL table.
     */
    @QueryMapping
    public List<Session> allSessions(){
        return sessionService.allSessions();
    }

    /*
    *  getSessionsByStudentFirstName accepts a String firstName of a Student and returns a Collection of all sessions with that first name.
    */
    @QueryMapping
    public Iterable<Session> getSessionsByStudentFirstName(@Argument String firstName) {
        return sessionService.getSessionsByStudentFirstName(firstName);
    }

    @QueryMapping
    public List<Session> getSessionsWithClubId(@Argument Long clubId){
        return sessionService.getSessionsWithClubId(clubId);
    }

    /*
    * getSessionsByDay accepts a String date parses the String into a LocalDate type.
    * getSessionsByDay returns a Collection of Sessions that have that date.
    */
    @QueryMapping
    public Iterable<Session> getSessionsByDay(@Argument String date) {
        LocalDate parsedDay = LocalDate.parse(date);
        return sessionService.getSessionsByDay(parsedDay);
    }

    /*
    *  getSessionsByWeek accepts an argument of String startOfWeekDate which is the date the week starts on.
    * The week start day is taken as the monday all startOfWeekDate should relate to this day.
    * getSessionsByWeek parses the String startOfWeekDate into a LocalDate.
    * startOfWeekDate returns a collection of Sessions that relate to that week.
    */
    @QueryMapping
    public Iterable<Session> getSessionsByWeek(@Argument String startOfWeekDate) {
        if (startOfWeekDate == null || startOfWeekDate.trim().isEmpty()) {
            throw new IllegalArgumentException("startOfWeekDate cannot be null or empty");
        }
        LocalDate parsedStartOfWeek;
        try {
            parsedStartOfWeek = LocalDate.parse(startOfWeekDate);
        } catch (DateTimeParseException ex) {
            throw new IllegalArgumentException("Invalid date format for startOfWeekDate. Expected format: YYYY-MM-DD");
        }

        if (parsedStartOfWeek.getDayOfWeek() != DayOfWeek.MONDAY) {
            throw new IllegalArgumentException("The start date must be a Monday");
        }

        return sessionService.getSessionsByWeek(parsedStartOfWeek);
    }
}
