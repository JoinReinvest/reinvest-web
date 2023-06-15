import { PropsWithChildren, useState } from 'react';
import { Profile } from 'reinvest-app-common/src/types/graphql';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useProfile } from './hooks/profile';
import { useUpdateUserProfile } from './hooks/update-profile';

const PROVIDER_NAME = 'UserProfileProvider';

export const useUserProfile = createContextConsumer(Context, PROVIDER_NAME);

export function UserProfileProvider({ children }: PropsWithChildren) {
  const [userProfile, storeUserProfile] = useState<Profile | null>(null);
  const { userProfileMeta } = useProfile({ storeUserProfile });
  const updateUserProfile = useUpdateUserProfile({ storeUserProfile });

  return <Context.Provider value={{ userProfile, userProfileMeta, ...updateUserProfile }}>{children}</Context.Provider>;
}
