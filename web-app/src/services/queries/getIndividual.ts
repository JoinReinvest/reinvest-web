import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { Individual } from 'types/graphql';

import { useApiClient } from '../useApiClient';
import { AddressFragment } from './fragments/address';

export const getIndividualQuery = gql`
  ${AddressFragment}
  query getIndividual {
    getIndividual {
      firstName
      middleName
      lastName
      dateOfBirth
      domicile
      address {
        ...AddressFragment
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
