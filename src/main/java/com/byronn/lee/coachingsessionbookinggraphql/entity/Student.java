package com.byronn.lee.coachingsessionbookinggraphql.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name = "is_waiver_signed", nullable = false)
    private boolean isWaiverSigned;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Session> sessions = new HashSet<>();

    // Standard getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public boolean getIsWaiverSigned() {
        return isWaiverSigned;
    }

    public void setIsWaiverSigned(boolean waiverSigned) {
        isWaiverSigned = waiverSigned;
    }

    public Set<Session> getSessions() {
        return sessions;
    }

    public void setSessions(Set<Session> sessions) {
        this.sessions = sessions;
    }

    // Methods to add and remove sessions
    public void addSession(Session session) {
        sessions.add(session);
        session.setStudent(this);
    }

    public void removeSession(Session session) {
        sessions.remove(session);
        session.setStudent(null);
    }
}
