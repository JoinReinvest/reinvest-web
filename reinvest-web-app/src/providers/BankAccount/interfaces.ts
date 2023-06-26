import { useCreateBankAccount } from './hooks/create-bank-account';
import { useCurrentBankAccount } from './hooks/current-bank-account';
import { useFulfillBankAccount } from './hooks/fulfill-bank-account';
import { useUpdateBankAccount } from './hooks/update-bank-account';

export interface State extends HookCreateBankAccount, HookCurrentBankAccount, HookUpdateBankAccount, HookFulfillBankAccount {}

type HookCreateBankAccount = ReturnType<typeof useCreateBankAccount>;
type HookCurrentBankAccount = ReturnType<typeof useCurrentBankAccount>;
type HookUpdateBankAccount = ReturnType<typeof useUpdateBankAccount>;
type HookFulfillBankAccount = ReturnType<typeof useFulfillBankAccount>;
