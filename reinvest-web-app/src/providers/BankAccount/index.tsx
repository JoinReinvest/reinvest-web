import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useCreateBankAccount } from './hooks/create-bank-account';
import { useCurrentBankAccount } from './hooks/current-bank-account';
import { useFulfillBankAccount } from './hooks/fulfill-bank-account';
import { useUpdateBankAccount } from './hooks/update-bank-account';

const PROVIDER_NAME = 'BankAccountProvider';

export const useBankAccount = createContextConsumer(Context, PROVIDER_NAME);

export function BankAccountProvider({ children }: PropsWithChildren) {
  const currentBankAccount = useCurrentBankAccount();
  const createBankAccount = useCreateBankAccount();
  const updateBankAccount = useUpdateBankAccount();
  const fulfillBankAccount = useFulfillBankAccount({ ...currentBankAccount, ...updateBankAccount, ...createBankAccount });

  return <Context.Provider value={{ ...currentBankAccount, ...createBankAccount, ...updateBankAccount, ...fulfillBankAccount }}>{children}</Context.Provider>;
}
