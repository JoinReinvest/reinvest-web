import { useAccountActivity } from './hooks/investments-list';

export type State = HookActivityAccount;

type HookActivityAccount = ReturnType<typeof useAccountActivity>;
