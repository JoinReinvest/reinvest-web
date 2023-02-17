import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getIndividualQuery = gql`
  query getIndividual() {
    getIndividual {
      firstName
      middleName
      lastName
      dateOfBirth
      domicile
      address {
        addressLine1
        addressLine2
        city
        zip
        country
        state
      }
    }
  }
`;

export const useGetIndividual = () => {
  const graphQLClient = GraphQLClient();

  return useQuery({
    queryKey: ['getIndividual'],
    queryFn: async () => {
      const { getIndividual } = await graphQLClient.request(getIndividualQuery);

      return getIndividual;
    },
  });
};
