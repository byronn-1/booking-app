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