import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { Individual } from 'types/graphql';

import { useApiClient } from '../apiClient';

const getIndividualQuery = gql`
  query getIndividual {
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
  const api = useApiClient();

  return useQuery<Individual>({
    queryKey: ['getIndividual'],
    queryFn: async () => {
      const { getIndividual } = await api.request(getIndividualQuery);

      return getIndividual;
    },
  });
};
