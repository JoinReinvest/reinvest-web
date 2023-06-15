import { useProfile } from './hooks/profile';
import { useUpdateUserProfile } from './hooks/update-profile';

export interface State extends HookUserProfile, HookUpdateUserProfile {}

type HookUserProfile = ReturnType<typeof useProfile>;
type HookUpdateUserProfile = ReturnType<typeof useUpdateUserProfile>;
