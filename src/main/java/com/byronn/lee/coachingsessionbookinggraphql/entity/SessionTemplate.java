package com.byronn.lee.coachingsessionbookinggraphql.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "session_template")
public class SessionTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="session_type")
    private String sessionType;
    @Column(name="location")
    private String location;
    @Column(name="day_of_the_week")
    private int dayOfTheWeek; // Storing day of the week
    @Column(name="time")
    private LocalDateTime time;

    @ManyToOne
    @JoinColumn(name = "seven_day_template_id")
    private SevenDaySessionTemplate sevenDaySessionTemplate;

    public SessionTemplate(Long id, String sessionType, String location, int dayOfTheWeek, LocalDateTime time, SevenDaySessionTemplate sevenDaySessionTemplate) {
        this.id = id;
        this.sessionType = sessionType;
        this.location = location;
        this.dayOfTheWeek = dayOfTheWeek;
        this.time = time;
        this.sevenDaySessionTemplate = sevenDaySessionTemplate;
    }

    public SessionTemplate() {

    }

    public Long getId() {
        return id;
    }

    public String getSessionType() {
        return sessionType;
    }

    public String getLocation() {
        return location;
    }

    public int getDayOfTheWeek() {
        return dayOfTheWeek;
    }

    public LocalDateTime getTime() {
        return time;
    }

}
