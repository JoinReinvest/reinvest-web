import { useAccountActivity } from './hooks/account-activities';

export type State = HookActivityAccount;

type HookActivityAccount = ReturnType<typeof useAccountActivity>;
