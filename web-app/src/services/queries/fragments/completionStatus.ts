import { gql } from 'graphql-request';

export const CompletionStatusFragment = gql`
  fragment CompletionStatusFragment on CompletionStatus {
    detailsCompleted
    phoneCompleted
  }
`;
