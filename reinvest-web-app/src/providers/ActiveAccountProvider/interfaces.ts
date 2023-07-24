import { useAccountStats } from './hooks/account-stats';
import { useAccounts } from './hooks/accounts';
import { useAvailableAccounts } from './hooks/available-accounts';
import { useBeneficiaries } from './hooks/beneficiaries';
import { useOnboardedAccount } from './hooks/onboarded-account';
import { useValidateActiveAccount } from './hooks/validate-active-account';

export interface State extends HookAccounts, HookAvailableAccounts, HookOnboardedAccount, HookAccountStats, HookBeneficiaries, HookValidateAccount {}

type HookAccounts = ReturnType<typeof useAccounts>;
type HookAvailableAccounts = ReturnType<typeof useAvailableAccounts>;
type HookOnboardedAccount = ReturnType<typeof useOnboardedAccount>;
type HookAccountStats = ReturnType<typeof useAccountStats>;
type HookBeneficiaries = ReturnType<typeof useBeneficiaries>;
type HookValidateAccount = ReturnType<typeof useValidateActiveAccount>;
