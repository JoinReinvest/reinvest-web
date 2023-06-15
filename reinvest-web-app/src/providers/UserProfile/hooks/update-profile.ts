import { useUpdateProfile } from 'reinvest-app-common/src/services/queries/updateProfile';
import { UpdateProfileInput } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Params {
  userProfileMeta: QueryMeta;
}

interface Returns {
  updateUserProfile: (input: UpdateProfileInput) => Promise<void>;
  updateUserProfileMeta: MutationMeta;
}

export function useUpdateUserProfile({ userProfileMeta }: Params): Returns {
  const { mutateAsync, ...updateUserProfileMeta } = useUpdateProfile(getApiClient);

  async function updateUserProfile(input: UpdateProfileInput) {
    await mutateAsync({ input });
    userProfileMeta.refetch();
  }

  return { updateUserProfile, updateUserProfileMeta };
}
