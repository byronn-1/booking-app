package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplate;
import com.byronn.lee.coachingsessionbookinggraphql.service.SessionTemplateService;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

/*
 * This Controller operates on the SessionsTemplate service and facilitates the reading of SessionTemplate listings in the SessionTemplate SQL table.
 */
@Controller
public class SessionTemplateQueryResolver {
    public final SessionTemplateService sessionTemplateService;

    public SessionTemplateQueryResolver(SessionTemplateService sessionTemplateService) {
        this.sessionTemplateService = sessionTemplateService;
    }

    /*
     * getAllSessionTemplates accepts no parameters and returns the entire collection of SessionTemplates in the SessionTemplate SQL table.
     */
    @QueryMapping
    public List<SessionTemplate> getAllSessionTemplates(){
        return sessionTemplateService.getAllSessionTemplates();
    }
}
