import { gql } from 'graphql-request';

export const ProfileDetailsFragment = gql`
  fragment ProfileDetailsFragment on ProfileDetails {
    firstName
    middleName
    lastName
    dateOfBirth
    ssn
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
    idScan {
      id
    }
    statements {
      type
      details
    }
  }
`;
