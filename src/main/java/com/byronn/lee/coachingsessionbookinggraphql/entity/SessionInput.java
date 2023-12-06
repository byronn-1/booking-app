package com.byronn.lee.coachingsessionbookinggraphql.entity;

import java.time.LocalDateTime;

public class SessionInput {
    private String sessionType;
    private String location;
    private LocalDateTime time;
    private Boolean isBooked;
    private Boolean isPaidFor;
    private Boolean isCompleted;
    private Long studentId;

    public SessionInput(String sessionType, String location, LocalDateTime time, Boolean isBooked, Boolean isPaidFor, Boolean isCompleted, Long studentId) {
        this.sessionType = sessionType;
        this.location = location;
        this.time = time;
        this.isBooked = isBooked;
        this.isPaidFor = isPaidFor;
        this.isCompleted = isCompleted;
        this.studentId = studentId;
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

    public Boolean getIsBooked() {
        return isBooked;
    }

    public Boolean getIsPaidFor() {
        return isPaidFor;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public Long getStudentId() {
        return studentId;
    }
}
