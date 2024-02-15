import { gql } from "@apollo/client";

export const GET_COACHES_FROM_CLUB_ID = gql`
query GetCoachesFromClubId($clubId: ID!){
    getCoachesFromClubId(clubId: $clubId){
        id
        firstName
        lastName
        phoneNo
        email
  }
}`