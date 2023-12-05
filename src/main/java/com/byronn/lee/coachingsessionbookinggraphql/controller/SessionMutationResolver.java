package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Session;
import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionInput;
import com.byronn.lee.coachingsessionbookinggraphql.service.SessionService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class SessionMutationResolver {

    SessionService sessionService = new SessionService();

    @MutationMapping
    public Session createSession(@Argument(name="sessionInput") SessionInput sessionInput) {

        return sessionService.createSession(sessionInput);
    }

}
