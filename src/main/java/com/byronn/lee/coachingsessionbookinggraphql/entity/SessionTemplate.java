package com.byronn.lee.coachingsessionbookinggraphql.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "session_template")
public class SessionTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//length of booking

    @Column(name="session_type")
    private String sessionType;
    @Column(name="location")
    private String location;
    @Column(name="day_of_the_week")
    private int dayOfTheWeek; // Storing day of the week
    @Column(name="time")
    private LocalDateTime time;
    @Column(name="seven_day_template_id")
    private Long sevenDaySessionTemplateId;
    @Column(name="clubId")
    private Long clubId;

    public SessionTemplate(Long id, String sessionType, String location, int dayOfTheWeek, LocalDateTime time, SevenDaySessionTemplate sevenDaySessionTemplate, Long sevenDaySessionTemplateId, Long clubId) {
        this.id = id;
        this.sessionType = sessionType;
        this.location = location;
        this.dayOfTheWeek = dayOfTheWeek;
        this.time = time;
        this.sevenDaySessionTemplateId = sevenDaySessionTemplateId;
        this.clubId = clubId;
    }

    public SessionTemplate() {

    }

    public Long getSevenDaySessionTemplateId() {
        return sevenDaySessionTemplateId;
    }

    public void setSevenDaySessionTemplateId(Long sevenDaySessionTemplateId) {
        this.sevenDaySessionTemplateId = sevenDaySessionTemplateId;
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

/*    public SevenDaySessionTemplate getSevenDaySessionTemplate() {
        return sevenDaySessionTemplate;
    }*/

    public LocalDateTime getTime() {
        return time;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDayOfTheWeek(int dayOfTheWeek) {
        this.dayOfTheWeek = dayOfTheWeek;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "SessionTemplate{" +
                "id=" + id +
                ", sessionType='" + sessionType + '\'' +
                ", location='" + location + '\'' +
                ", dayOfTheWeek=" + dayOfTheWeek +
                ", time=" + time +
                ", sevenDaySessionTemplateId=" + sevenDaySessionTemplateId +
                ", clubId=" + clubId +
                '}';
    }
    /*    public void setSevenDaySessionTemplate(SevenDaySessionTemplate sevenDaySessionTemplate) {
        this.sevenDaySessionTemplate = sevenDaySessionTemplate;
    }*/
}
