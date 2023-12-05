package com.byronn.lee.coachingsessionbookinggraphql.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "session")
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "session_type")
    private String sessionType;

    @Column(name = "location")
    private String location;

    @Column(name = "time")
    private LocalDateTime time;

    @Column(name = "is_booked", nullable = false)
    private boolean isBooked;

    @Column(name = "is_paid_for", nullable = false)
    private boolean isPaidFor;

    @Column(name = "is_completed", nullable = false)
    private boolean isCompleted;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setIsBooked(boolean booked) {
        isBooked = booked;
    }

    public boolean isPaidFor() {
        return isPaidFor;
    }

    public void setIsPaidFor(boolean paidFor) {
        isPaidFor = paidFor;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(boolean completed) {
        isCompleted = completed;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
