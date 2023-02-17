import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Individual } from 'gql/types';
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

export const useGetIndividual = (): UseQueryResult<Individual> => {
  const graphQLClient = GraphQLClient();

  return useQuery<Individual>({
    queryKey: ['getIndividual'],
    queryFn: async () => {
      const { getIndividual } = await graphQLClient.request(getIndividualQuery);

      return getIndividual;
    },
  });
};
