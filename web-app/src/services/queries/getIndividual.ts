import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Individual } from 'graphql/types';
import { gql } from 'graphql-request';

import { apiClient } from '../apiClient';

const getIndividualQuery = gql`
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
  const api = apiClient();

  return useQuery<Individual>({
    queryKey: ['getIndividual'],
    queryFn: async () => {
      const { getIndividual } = await api.request(getIndividualQuery);

      return getIndividual;
    },
  });
};
