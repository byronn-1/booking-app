package com.byronn.lee.coachingsessionbookinggraphql.entity;

import java.time.LocalDateTime;
import java.util.List;

public class SessionTemplateInput {
    private String sessionType;
    private String location;
    private LocalDateTime time;
    private SessionTemplate sessionTemplate;

    public SessionTemplateInput(String sessionType, String location, LocalDateTime time, SessionTemplate sessionTemplate) {
        this.sessionType = sessionType;
        this.location = location;
        this.time = time;
        this.sessionTemplate = sessionTemplate;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public void setSessionTemplate(SessionTemplate sessionTemplate) {
        this.sessionTemplate = sessionTemplate;
    }

    public String getSessionType() {
        return sessionType;
    }

    public String getLocation() {
        return location;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public SessionTemplate getSessionTemplate() {
        return sessionTemplate;
    }
}
