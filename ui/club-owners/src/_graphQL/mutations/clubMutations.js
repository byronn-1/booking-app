import { gql } from '@apollo/client';

export const CREATE_CLUB_MUTATION = gql`
  mutation createClub($clubInput: ClubInput!) {
    createClub(clubInput: $clubInput) {
        clubName
        clubType
        streetNumber
        streetName
        addressLine2
        city
        state
        postalCode
        country
        isClubPrivate
        websiteUrl
        id
    }
  }
`;
