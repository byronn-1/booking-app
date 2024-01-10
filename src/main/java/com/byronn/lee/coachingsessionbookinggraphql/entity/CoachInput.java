package com.byronn.lee.coachingsessionbookinggraphql.entity;

public class CoachInput {
    private String firstName;
    private String lastName;
    private String phoneNo;
    private String email;
    private Long clubId;

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public String getEmail() {
        return email;
    }

    public Long getClubId() {
        return clubId;
    }
}
