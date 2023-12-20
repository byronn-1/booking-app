package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplate;
import com.byronn.lee.coachingsessionbookinggraphql.service.SessionTemplateService;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class SessionTemplateQueryResolver {
    public final SessionTemplateService sessionTemplateService;

    public SessionTemplateQueryResolver(SessionTemplateService sessionTemplateService) {
        this.sessionTemplateService = sessionTemplateService;
    }
    @QueryMapping
    public List<SessionTemplate> getAllSessionTemplates(){
        return sessionTemplateService.getAllSessionTemplates();
    }
}
