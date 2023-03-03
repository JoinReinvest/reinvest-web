import { gql } from 'graphql-request';

export const ProfileDetailsFragment = gql`
  fragment ProfileDetailsFragment on ProfileDetails {
    firstName
    middleName
    lastName
    dateOfBirth
    domicile {
      type
      birthCountry
      citizenshipCountry
      visaType
    }
    address {
      addressLine1
      addressLine2
      city
      zip
      country
      state
    }
    ssn
    idScan {
      id
    }
    statements {
      type
      details
    }
  }
`;
