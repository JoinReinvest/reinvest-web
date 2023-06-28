import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useAccountActivity } from './hooks/account-activities';

const PROVIDER_NAME = 'AccountActivityProvider';

export const useAccountActivities = createContextConsumer(Context, PROVIDER_NAME);

export function AccountActivityProvider({ children }: PropsWithChildren) {
  const { accountActivities, accountActivityMeta } = useAccountActivity();

  return <Context.Provider value={{ accountActivities, accountActivityMeta }}>{children}</Context.Provider>;
}
