import { gql } from '@apollo/client';

export const ADD_OWNER_MUTATION = gql`
  mutation AddOwner($ownerInput: OwnerInput!) {
    addOwner(ownerInput: $ownerInput) {
        firstName
        lastName
        phoneNo
        email
    }
  }
`;

