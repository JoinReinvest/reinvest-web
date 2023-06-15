import { Profile } from 'reinvest-app-common/src/types/graphql';

import { useProfile } from './hooks/profile';
import { useUpdateUserProfile } from './hooks/update-profile';

export interface State extends HookUserProfile, HookUpdateUserProfile {
  userProfile: Profile | null;
}

type HookUserProfile = ReturnType<typeof useProfile>;
type HookUpdateUserProfile = ReturnType<typeof useUpdateUserProfile>;
