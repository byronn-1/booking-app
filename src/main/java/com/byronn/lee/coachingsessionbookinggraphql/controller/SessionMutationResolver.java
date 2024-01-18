package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Session;
import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionInput;
import com.byronn.lee.coachingsessionbookinggraphql.service.SessionService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

/*
 * This controller operates on the Session service and facilitates Create, Update and Delete.
 * The Session service allows for the operations on the Sessions SQL table.
 * A Session is any entity that denotes a period of time that a club meets and can be created by a Coach or Owner booked by a Student.
 */
@Controller
public class SessionMutationResolver {


    private final SessionService sessionService;


    public SessionMutationResolver(SessionService sessionService){
        this.sessionService = sessionService;
    }

    /*
     * createSession allows for the creation of new Sessions. It accepts SessionInput as an argument.
     * SessionInput models the Session entity without ID's (which are created in the databasing system).
     * It should return the Session that has been created.
     */
    @MutationMapping
    public Session createSession(@Argument(name="sessionInput") SessionInput sessionInput) {

        return sessionService.createSession(sessionInput);
    }

    @MutationMapping
    public Session createSessionWithClubId(@Argument(name="sessionInput") SessionInput sessionInput, @Argument(name="clubId") Long clubId){
        return sessionService.createSessionWithClubId(sessionInput, clubId);
    }
}
