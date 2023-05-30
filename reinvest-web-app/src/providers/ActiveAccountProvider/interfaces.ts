import { useAccountStats } from './hooks/account-stats';
import { useAvailableAccounts } from './hooks/available-accounts';
import { useBeneficiaries } from './hooks/beneficiaries';
import { useOnboardedAccount } from './hooks/onboarded-account';
import { useProfileAccounts } from './hooks/profile-account';
import { useValidateActiveAccount } from './hooks/validate-active-account';

export interface State extends HookProfileAccounts, HookAvailableAccounts, HookOnboardedAccount, HookAccountStats, HookBeneficiaries, HookValidateAccount {}

type HookProfileAccounts = ReturnType<typeof useProfileAccounts>;
type HookAvailableAccounts = ReturnType<typeof useAvailableAccounts>;
type HookOnboardedAccount = ReturnType<typeof useOnboardedAccount>;
type HookAccountStats = ReturnType<typeof useAccountStats>;
type HookBeneficiaries = ReturnType<typeof useBeneficiaries>;
type HookValidateAccount = ReturnType<typeof useValidateActiveAccount>;
