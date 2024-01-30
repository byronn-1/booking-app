package com.byronn.lee.coachingsessionbookinggraphql.entity;

import jakarta.persistence.Column;

import java.time.LocalDateTime;

public class ClubInput {
    private String clubName;
    private String clubType;
    private String streetNumber;
    private String streetName;
    private String addressLine2;
    private String city;
    private String postalCode;
    private String country;
    private String state;
    private LocalDateTime accCreated;
    private String isClubPrivate;
    private String websiteUrl;

    public ClubInput(String clubName,String clubType, String streetNumber, String streetName, String addressLine2, String city, String postalCode, String country, String state, LocalDateTime accCreated, String isClubPrivate, String websiteUrl) {
        this.clubName = clubName;
        this.clubType = clubType;
        this.streetNumber = streetNumber;
        this.streetName = streetName;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.state = state;
        this.accCreated = accCreated;
        this.isClubPrivate = isClubPrivate;
        this.websiteUrl = websiteUrl;
    }
    public String getClubName() {
        return clubName;
    }

    public String getClubType() {
        return clubType;
    }

    public void setClubType(String clubType) {
        this.clubType = clubType;
    }

    public String getIsClubPrivate() {
        return isClubPrivate;
    }

    public void setIsClubPrivate(String isClubPrivate) {
        this.isClubPrivate = isClubPrivate;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public LocalDateTime getAccCreated() {
        return accCreated;
    }

    public void setAccCreated(LocalDateTime accCreated) {
        this.accCreated = accCreated;
    }

    @Override
    public String toString() {
        return "ClubInput{" +
                "clubName='" + clubName + '\'' +
                ", clubType='" + clubType + '\'' +
                ", streetNumber='" + streetNumber + '\'' +
                ", streetName='" + streetName + '\'' +
                ", addressLine2='" + addressLine2 + '\'' +
                ", city='" + city + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", country='" + country + '\'' +
                ", state='" + state + '\'' +
                ", accCreated=" + accCreated +
                ", isClubPrivate='" + isClubPrivate + '\'' +
                ", websiteUrl='" + websiteUrl + '\'' +
                '}';
    }
}
