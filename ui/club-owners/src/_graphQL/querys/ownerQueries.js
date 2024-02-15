import { gql } from '@apollo/client';

export const GET_OWNER_BY_CLUB_ID = gql`
  query GetOwnerByClubId($clubId: ID!) {
    getOwnerByClubId(clubId: $clubId) {
        firstName
        lastName
        phoneNo
        email
        id
    }
  }
`;