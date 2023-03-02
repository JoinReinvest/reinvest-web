import { gql } from 'graphql-request';

export const FromToFragment = gql`
  fragment FromToFragment on FromTo {
    from
    to
  }
`;
