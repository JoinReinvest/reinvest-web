import { gql } from 'graphql-request';

export const DomicileFragment = gql`
  fragment DomicileFragment on Domicile {
    type
    birthCountry
    citizenshipCountry
    visaType
  }
`;
