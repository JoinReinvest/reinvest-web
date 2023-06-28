import { useAccountActivity } from './hooks/account-activities';

export type State = HookAccountActivity;

type HookAccountActivity = ReturnType<typeof useAccountActivity>;
