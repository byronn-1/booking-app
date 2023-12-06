package com.byronn.lee.coachingsessionbookinggraphql.entity;

import java.util.List;

public class SevenDaySessionTemplateInput {

    private Long id;
    private String templateName;
    private String coach;
    private List<SessionTemplateInput> sessionTemplates;

    public SevenDaySessionTemplateInput(Long id, String templateName, String coach, List<SessionTemplateInput> sessionTemplates) {
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

    public List<SessionTemplateInput> getSessionTemplates() {
        return sessionTemplates;
    }


}
