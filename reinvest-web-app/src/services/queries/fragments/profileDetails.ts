import { gql } from 'graphql-request';

export const ProfileDetailsFragment = gql`
  fragment ProfileDetailsFragment on ProfileDetails {
    firstName
    middleName
    lastName
    dateOfBirth
    ssn
  }
`;
