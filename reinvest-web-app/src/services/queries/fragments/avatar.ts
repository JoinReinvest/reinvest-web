import { gql } from 'graphql-request';

export const AvatarFragment = gql`
  fragment AvatarFragment on GetAvatarLink {
    id
    url
  }
`;
