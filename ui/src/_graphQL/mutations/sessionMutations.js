
import { gql } from '@apollo/client';

export const CREATE_SESSION_MUTATION = gql`
  mutation CreateSession($sessionInput: SessionInput!) {
    createSession(sessionInput: $sessionInput) {
      sessionType
      location
      time
      isBooked
      isPaidFor
      isCompleted
    }
  }
`;