import { gql } from '@apollo/client';
export const GET_CLUB_DETAILS = gql`
query GetClubDetails($clubId: ID!) {
    getClubFromClubId(clubId: $clubId) {
        id
        clubName
        clubType
        streetNumber
        streetName
        city
        state
        postalCode
        country
        websiteUrl
        isClubPrivate
        hasCoaches
    }
}`