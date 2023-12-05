package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Session;
import com.byronn.lee.coachingsessionbookinggraphql.service.SessionService;
import org.springframework.stereotype.Component;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;
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
    public Iterable<Session> getSessionsByDay(@Argument String day) {
        LocalDate parsedDay = LocalDate.parse(day);
        return sessionService.getSessionsByDay(parsedDay);
    }
    @QueryMapping
    public Iterable<Session> getSessionsByWeek(@Argument String startOfWeekDate) {
        LocalDate parsedStartOfWeek = LocalDate.parse(startOfWeekDate);
        return sessionService.getSessionsByWeek(parsedStartOfWeek);
    }
}
