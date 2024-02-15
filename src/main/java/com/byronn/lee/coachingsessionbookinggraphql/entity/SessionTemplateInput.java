package com.byronn.lee.coachingsessionbookinggraphql.entity;

import java.time.LocalDateTime;
import java.util.List;

public class SessionTemplateInput {
    private String sessionType;
    private String location;

    private int dayOfTheWeek;
    private LocalDateTime time;
//length of booking
    private int duration;
    private Long sevenDaySessionTemplateId;

    public SessionTemplateInput(String sessionType, String location,int dayOfTheWeek, LocalDateTime time, int duration, Long sevenDaySessionTemplateId) {
        this.sessionType = sessionType;
        this.location = location;
        this.dayOfTheWeek = dayOfTheWeek;
        this.time = time;
        this.duration = duration;
        this.sevenDaySessionTemplateId = sevenDaySessionTemplateId;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Long getSevenDayTemplateId() {
        return sevenDaySessionTemplateId;
    }

    public void setSevenDayTemplateId(Long sevenDayTemplateId) {
        this.sevenDaySessionTemplateId = sevenDayTemplateId;
    }

    public int getDayOfTheWeek() {
        return dayOfTheWeek;
    }

    public void setDayOfTheWeek(int dayOfTheWeek) {
        this.dayOfTheWeek = dayOfTheWeek;
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

    public String getSessionType() {
        return sessionType;
    }

    public String getLocation() {
        return location;
    }

    public LocalDateTime getTime() {
        return time;
    }

}
