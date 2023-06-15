import { useEffect } from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { Profile } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Params {
  storeUserProfile: (userProfile: Profile) => void;
}

interface Return {
  userProfileMeta: QueryMeta;
}

export function useProfile({ storeUserProfile }: Params): Return {
  const { data, ...userProfileMeta } = useGetUserProfile(getApiClient);

  useEffect(() => {
    function maybeStoreUserProfile() {
      const hasSucceded = userProfileMeta.isFetched || userProfileMeta.isSuccess;

      if (hasSucceded && data) {
        storeUserProfile(data);
      }
    }

    maybeStoreUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfileMeta.isFetched, userProfileMeta.isSuccess]);

  return { userProfileMeta };
}
