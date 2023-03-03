import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Individual } from 'types/graphql';

import { AddressFragment } from './fragments/address';
import { ProfileDetailsFragment } from './fragments/profileDetails';

const getIndividualQuery = gql`
  ${ProfileDetailsFragment}
  ${AddressFragment}
  query getIndividual {
    getIndividual {
      ...ProfileDetailsFragment
      address {
        ...AddressFragment
      }
    }
  }
`;

export const useGetIndividual = (): UseQueryResult<Individual> => {
  const api = getApiClient();

  return useQuery<Individual>({
    queryKey: ['getIndividual'],
    queryFn: async () => {
      const { getIndividual } = await api.request(getIndividualQuery);

      return getIndividual;
    },
  });
};
