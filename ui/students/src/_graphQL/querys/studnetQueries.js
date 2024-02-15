// queries.js
import { gql } from '@apollo/client';

export const GET_ALL_STUDENTS = gql`
  query GetAllStudents {
    students {
      id
      firstName
      lastName
    }
  }
`;
