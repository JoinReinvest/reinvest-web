import { gql } from 'graphql-request';

export const NetRangeFragment = gql`
  fragment NetRangeFragment on NetRange {
    range
  }
`;
