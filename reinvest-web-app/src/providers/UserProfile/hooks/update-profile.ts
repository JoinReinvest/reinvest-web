import { useEffect } from 'react';
import { useUpdateProfile } from 'reinvest-app-common/src/services/queries/updateProfile';
import { UpdateProfileInput } from 'reinvest-app-common/src/types/graphql';
import { Profile } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

interface Params {
  storeUserProfile: (userProfile: Profile) => void;
}

interface Returns {
  updateUserProfile: (input: UpdateProfileInput) => Promise<void>;
  updateUserProfileMeta: MutationMeta;
}

export function useUpdateUserProfile({ storeUserProfile }: Params): Returns {
  const { data, mutateAsync, ...updateUserProfileMeta } = useUpdateProfile(getApiClient);

  useEffect(() => {
    function maybeStoreUserProfile() {
      if (updateUserProfileMeta.isSuccess && data) {
        storeUserProfile(data);
      }
    }

    maybeStoreUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserProfileMeta.isSuccess, data]);

  async function updateUserProfile(input: UpdateProfileInput) {
    updateUserProfileMeta.reset();
    await mutateAsync({ input });
  }

  return { updateUserProfile, updateUserProfileMeta };
}
