package com.byronn.lee.coachingsessionbookinggraphql.entity;

public class OwnerInput {
    private String firstName;
    private String lastName;
    private String phoneNo;
    private String email;
    private Long clubId;

    public OwnerInput(String firstName, String lastName, String phoneNo, String email, Long clubId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.email = email;
        this.clubId = clubId;
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

    public String getEmail() {
        return email;
    }

    public Long getClubId() {
        return clubId;
    }
}
