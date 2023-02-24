import { gql } from 'graphql-request';

export const AccountsFragment = gql`
  fragment AccountsFragment on Accounts {
    id
    type
    avatarUrl
    positionTotal
  }
`;
