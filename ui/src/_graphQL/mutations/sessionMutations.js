
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

export const CREATE_SESSIONS_FROM_TEMPLATE_MUTATION = gql`
  mutation CreateSessionsFromTemplate($templateId: ID!, $weekStartDate: LocalDateTime!) {
    createSessionsFromId(templateId: $templateId, weekStartDate: $weekStartDate) {
      id
      sessionType
      location
      time
    }
  }
`;