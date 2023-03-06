import { gql } from 'graphql-request';

export const StatementFragment = gql`
  fragment StatementFragment on Statement {
    type
    details
  }
`;
