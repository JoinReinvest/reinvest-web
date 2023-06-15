import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useProfile } from './hooks/profile';
import { useUpdateUserProfile } from './hooks/update-profile';

const PROVIDER_NAME = 'UserProfileProvider';

export const useUserProfile = createContextConsumer(Context, PROVIDER_NAME);

export function UserProfileProvider({ children }: PropsWithChildren) {
  const { userProfile, userProfileMeta } = useProfile();
  const updateUserProfile = useUpdateUserProfile({ userProfileMeta });

  return <Context.Provider value={{ userProfile, userProfileMeta, ...updateUserProfile }}>{children}</Context.Provider>;
}
