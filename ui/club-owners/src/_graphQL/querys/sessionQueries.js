import { gql } from '@apollo/client';

export const GET_ALL_SESSIONS = gql`
query GetAllSessions {
    allSessions {
      id
      sessionType
      location
      time
      isBooked
      isPaidFor
      isCompleted
    }
  }
`
export const GET_SESSIONS_FROM_CLUB_ID = gql`
query GetSessionsWithClubId($clubId: Int!){
  getSessionsWithClubId(clubId: $clubId){
    id
    sessionType
    location
    time
    isBooked
    isPaidFor
    isCompleted
    duration
  }
}`