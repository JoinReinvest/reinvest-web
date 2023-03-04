import { gql } from 'graphql-request';

export const AccountsFragment = gql`
  fragment AccountsFragment on AccountOverview {
    id
    type
    avatar {
      id
      url
    }
    positionTotal
  }
`;
