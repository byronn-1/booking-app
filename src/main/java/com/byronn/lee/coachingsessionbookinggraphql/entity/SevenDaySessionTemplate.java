package com.byronn.lee.coachingsessionbookinggraphql.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "seven_day_session_template")
public class SevenDaySessionTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "template_name")
    private String templateName;

    @Column(name = "coach")
    private String coach;

    @Column(name="coach_id")
    private Long coachId;

    @JoinColumn(name = "club_id")
    private long clubId;

    private transient List<SessionTemplate> sessionTemplates;

/*    @OneToMany(mappedBy = "sevenDaySessionTemplate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SessionTemplate> sessionTemplates;*/

    public Long getCoachId() {
        return coachId;
    }

    public void setCoachId(Long coachId) {
        this.coachId = coachId;
    }

    public long getClubId() {
        return clubId;
    }

    public void setClubId(long clubId) {
        this.clubId = clubId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<SessionTemplate> getSessionTemplates() {
        return sessionTemplates;
    }

    public void setSessionTemplates(List<SessionTemplate> sessionTemplates) {
        this.sessionTemplates = sessionTemplates;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public void setCoach(String coach) {
        this.coach = coach;
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

    @Override
    public String toString() {
        return "SevenDaySessionTemplate{" +
                "id=" + id +
                ", templateName='" + templateName + '\'' +
                ", coach='" + coach + '\'' +
                ", club=" + clubId +
                ", sessionTemplates=" + sessionTemplates +
                '}';
    }
}
