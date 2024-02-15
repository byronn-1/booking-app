
import { gql } from '@apollo/client';

export const CREATE_SEVEN_DAY_SESSIONS_TEMPLATE_FROM_CLUB_ID = gql`
  mutation CreateSevenDaySessionsTemplateFromClubId($sevenDaySessionTemplateInput: SevenDaySessionTemplateInput!, $clubId: Int!){
    createSevenDaySessionsTemplateFromClubId(sevenDaySessionTemplateInput: $sevenDaySessionTemplateInput, clubId: $clubId){
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
`
export const CREATE_SEVEN_DAY_SESSIONS_TEMPLATE_MUTATION = gql`
  mutation CreateSevenDaySessionsTemplate($sevenDaySessionTemplateInput: SevenDaySessionTemplateInput!, $weekStartDate: LocalDateTime) {
    createSevenDaySessionsTemplate(sevenDaySessionTemplateInput: $sevenDaySessionTemplateInput, weekStartDate: $weekStartDate) {
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
export const CREATE_SEVEN_DAY_SESSION_TEMPLATE = gql`
  mutation CreateSevenDaySessionsTemplate($input: SevenDaySessionTemplateInput!, $weekStartDate: LocalDateTime!) {
    createSevenDaySessionsTemplate(sevenDaySessionTemplateInput: $input, weekStartDate: $weekStartDate) {
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
export const CREATE_SEVEN_DAY_SESSIONS_TEMPLATE_MUTATION_WITHOUT_SESSIONS = gql`
mutation CreateSevenDaySessionTemplateWithoutSessions($input: SevenDaySessionTemplateInput!) {
  createSevenDaySessionTemplateWithoutSessions(input: $input) {
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