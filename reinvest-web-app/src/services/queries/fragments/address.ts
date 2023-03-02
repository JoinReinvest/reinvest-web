import { gql } from 'graphql-request';

export const AddressFragment = gql`
  fragment AddressFragment on Address {
    addressLine1
    addressLine2
    city
    zip
    country
    state
  }
`;
