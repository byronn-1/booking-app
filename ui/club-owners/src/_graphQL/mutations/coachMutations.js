import { gql } from "@apollo/client";

export const ADD_COACH_MUTATION = gql`
    mutation addCoach($coachInput: CoachInput!){
        addCoach(coachInput: $coachInput){
            id
            firstName
            lastName
            phoneNo
            email
            clubId
        }
    }
`