import { gql } from 'graphql-request';

export const CompletionStatusFragment = gql`
  fragment CompletionStatusFragment on ProfileCompletionStatus {
    detailsCompleted
    phoneCompleted
  }
`;
