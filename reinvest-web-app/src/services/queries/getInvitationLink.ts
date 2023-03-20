import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

export const getInvitationQuery = gql`
  query getInvitationLink {
    userInvitationLink {
      url
    }
  }
`;

export const useGetInvitationLink = () =>
  useQuery<Query['userInvitationLink'] | null>({
    queryKey: ['userInvitationLink'],
    queryFn: async () => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { userInvitationLink } = await api.request<Query>(getInvitationQuery);

      return userInvitationLink;
    },
  });
