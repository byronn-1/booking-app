
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
      duration
    }
  }
`;

export const CREATE_SESSIONS_FROM_CLUB_ID_WITH_TEMPLATE_ID = gql`
mutation CreateSessionsWithClubIdFromTemplateId($templateId: ID!, $weekStartDate:LocalDateTime!, $clubId: ID!){
  createSessionsWithClubIdFromTemplateId(templateId: $templateId, weekStartDate: $weekStartDate, clubId:$clubId){
      id
      sessionType
      location
      time
      duration
  }
}
`
export const CREATE_SESSIONS_WITH_CLUB_ID = gql`
  mutation CreateSessionWithClubId($sessionInput: SessionInput!, $clubId: Int!) {
    createSessionWithClubId(sessionInput: $sessionInput, clubId: $clubId) {
      id
      sessionType
      location
      time
    }
  }
`;