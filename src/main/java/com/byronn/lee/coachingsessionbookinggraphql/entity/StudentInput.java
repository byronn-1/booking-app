package com.byronn.lee.coachingsessionbookinggraphql.entity;

import jakarta.persistence.Column;

public class StudentInput {
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNo;
    private boolean isWaiverSigned;

    public StudentInput(Long id, String firstName, String lastName, String phoneNo, boolean isWaiverSigned) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.isWaiverSigned = isWaiverSigned;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public boolean getIsWaiverSigned() {
        return isWaiverSigned;
    }

}
