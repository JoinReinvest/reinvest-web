import { useAccountStats } from './hooks/account-stats';
import { useAccounts } from './hooks/accounts';
import { useAvailableAccounts } from './hooks/available-accounts';
import { useBeneficiaries } from './hooks/beneficiaries';
import { useOnboardedAccount } from './hooks/onboarded-account';
import { useUserProfile } from './hooks/user-profile';
import { useValidateActiveAccount } from './hooks/validate-active-account';

export interface State
  extends HookUserProfile,
    HookAccounts,
    HookAvailableAccounts,
    HookOnboardedAccount,
    HookAccountStats,
    HookBeneficiaries,
    HookValidateAccount {}

type HookUserProfile = ReturnType<typeof useUserProfile>;
type HookAccounts = ReturnType<typeof useAccounts>;
type HookAvailableAccounts = ReturnType<typeof useAvailableAccounts>;
type HookOnboardedAccount = ReturnType<typeof useOnboardedAccount>;
type HookAccountStats = ReturnType<typeof useAccountStats>;
type HookBeneficiaries = ReturnType<typeof useBeneficiaries>;
type HookValidateAccount = ReturnType<typeof useValidateActiveAccount>;
