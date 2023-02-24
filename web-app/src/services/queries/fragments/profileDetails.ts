import { gql } from 'graphql-request';

export const ProfileDetailsFragment = gql`
  fragment ProfileDetailsFragment on Individual {
    firstName
    middleName
    lastName
    dateOfBirth
    domicile
  }
`;
