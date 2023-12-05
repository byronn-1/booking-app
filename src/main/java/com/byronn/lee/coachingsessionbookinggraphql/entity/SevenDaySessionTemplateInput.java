package com.byronn.lee.coachingsessionbookinggraphql.entity;

import java.util.List;

public class SevenDaySessionTemplateInput {

    private Long id;
    private String templateName;
    private String coach;
    private List<SessionTemplate> sessionTemplates;

    public SevenDaySessionTemplateInput(Long id, String templateName, String coach, List<SessionTemplate> sessionTemplates) {
        this.id = id;
        this.templateName = templateName;
        this.coach = coach;
        this.sessionTemplates = sessionTemplates;
    }

    public Long getId() {
        return id;
    }

    public String getTemplateName() {
        return templateName;
    }

    public String getCoach() {
        return coach;
    }

    public List<SessionTemplate> getSessionTemplates() {
        return sessionTemplates;
    }


}
