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

@Controller
public class SessionQueryResolver {
    private final SessionService sessionService;

    public SessionQueryResolver(SessionService sessionService){
        this.sessionService = sessionService;
    }

    @QueryMapping
    public List<Session> allSessions(){
        return sessionService.allSessions();
    }
    @QueryMapping
    public Iterable<Session> getSessionsByStudentFirstName(@Argument String firstName) {
        return sessionService.getSessionsByStudentFirstName(firstName);
    }
    @QueryMapping
    public Iterable<Session> getSessionsByDay(@Argument String date) {
        LocalDate parsedDay = LocalDate.parse(date);
        return sessionService.getSessionsByDay(parsedDay);
    }
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
