import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { Individual } from 'types/graphql';

import { useApiClient } from '../apiClient';
import { ProfileDetailsFragment } from './fragments/profileDetails';

const getIndividualQuery = gql`
  ${ProfileDetailsFragment}
  query getIndividual {
    getIndividual {
      ...ProfileDetailsFragment
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
    enabled: false,
  });
};
