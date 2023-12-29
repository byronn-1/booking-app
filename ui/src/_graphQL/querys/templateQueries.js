import { gql } from '@apollo/client';

export const GET_ALL_SESSION_TEMPLATES = gql`
  query GetAllSessionTemplates {
    getAllSevenDaySessionTemplates {
      id
      templateName
      coach
      sessionTemplates {
        id
        sessionType
        location
        dayOfTheWeek
        time
      }
    }
  }
`;