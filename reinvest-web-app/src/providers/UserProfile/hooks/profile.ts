import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { Profile } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Return {
  userProfile: Profile | null;
  userProfileMeta: QueryMeta;
}

export function useProfile(): Return {
  const { data: userProfile, ...userProfileMeta } = useGetUserProfile(getApiClient);

  return { userProfile: userProfile ?? null, userProfileMeta };
}
