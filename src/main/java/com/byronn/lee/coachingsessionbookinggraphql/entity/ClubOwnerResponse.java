package com.byronn.lee.coachingsessionbookinggraphql.entity;

public class ClubOwnerResponse {
    private Club club;
    private Owner owner;

    public ClubOwnerResponse(Club club, Owner owner) {
        this.club = club;
        this.owner = owner;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }
}
