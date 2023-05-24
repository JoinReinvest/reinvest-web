import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useCreateInvestment } from './hooks/create-investment';
import { useDraftInvestment } from './hooks/draft-investment';
import { useInitiateInvestment } from './hooks/initiate-investment';
import { useSubscriptionAgreement } from './hooks/subscription-agreement';

const PROVIDER_NAME = 'RecurringInvestmentProvider';

export const useRecurringInvestment = createContextConsumer(Context, PROVIDER_NAME);

export function RecurringInvestmentProvider({ children }: PropsWithChildren) {
  const { recurringInvestment, recurringInvestmentMeta } = useDraftInvestment();
  const { initiateRecurringInvestment, initiateRecurringInvestmentMeta } = useInitiateInvestment();
  const { createRecurringInvestment, createRecurringInvestmentMeta } = useCreateInvestment({ recurringInvestmentMeta });
  const subscriptionAgreementHookResult = useSubscriptionAgreement({
    recurringInvestment,
  });

  return (
    <Context.Provider
      value={{
        recurringInvestment,
        recurringInvestmentMeta,
        createRecurringInvestment,
        createRecurringInvestmentMeta,
        ...subscriptionAgreementHookResult,
        initiateRecurringInvestment,
        initiateRecurringInvestmentMeta,
      }}
    >
      {children}
    </Context.Provider>
  );
}
