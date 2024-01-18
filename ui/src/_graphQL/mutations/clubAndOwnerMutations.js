import { gql } from '@apollo/client';

export const CREATE_CLUB_WITH_OWNER_MUTATION = gql`
  mutation CreateClubWithOwner($ownerInput: OwnerInput!, $clubInput: ClubInput!) {
    createClubWithOwner(ownerInput: $ownerInput, clubInput: $clubInput){
      club{
        id
      }
      owner{
        id
      }
    }
  }
`;