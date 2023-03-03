import { gql } from 'graphql-request';

export const EmployerFragment = gql`
  fragment EmployerFragment on Employer {
    nameOfEmployer
    title
    industry
  }
`;
