package com.byronn.lee.coachingsessionbookinggraphql.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
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

    private transient List<SessionTemplate> sessionTemplates;

/*    @OneToMany(mappedBy = "sevenDaySessionTemplate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SessionTemplate> sessionTemplates;*/

    public SevenDaySessionTemplate(Long id, String templateName, String coach ) {
        this.id = id;
        this.templateName = templateName;
        this.coach = coach;
        this.sessionTemplates = new ArrayList<>();
    }

    public SevenDaySessionTemplate() {

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
                ", sessionTemplates=" + sessionTemplates +
                '}';
    }
}
