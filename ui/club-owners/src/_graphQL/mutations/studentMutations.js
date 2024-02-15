import { gql } from '@apollo/client';

export const ADD_STUDENT_MUTATION = gql`
  mutation AddStudent($input: StudentInput!) {
    addStudent(studentInput: $input) {
      id
      firstName
      lastName
      phoneNo
      isWaiverSigned
    }
  }
`;