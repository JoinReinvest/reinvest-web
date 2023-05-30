import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useCreateInvestment } from './hooks/create-investment';
import { useDraftInvestment } from './hooks/draft-investment';
import { useInitiateInvestment } from './hooks/initiate-investment';
import { useSubscriptionAgreement } from './hooks/subscription-agreement';
import { ProviderProps } from './interfaces';

const PROVIDER_NAME = 'RecurringInvestmentProvider';

export const useRecurringInvestment = createContextConsumer(Context, PROVIDER_NAME);

export function RecurringInvestmentProvider({ enableQueries: enableQuery = true, children }: ProviderProps) {
  const { recurringInvestment, recurringInvestmentMeta } = useDraftInvestment({ enableQuery });
  const initiateRecurringInvestmentResult = useInitiateInvestment();
  const createRecurringInvestmentResult = useCreateInvestment({ recurringInvestmentMeta });
  const subscriptionAgreementHookResult = useSubscriptionAgreement({ enableQuery, recurringInvestment });

  return (
    <Context.Provider
      value={{
        recurringInvestment,
        recurringInvestmentMeta,
        ...createRecurringInvestmentResult,
        ...initiateRecurringInvestmentResult,
        ...subscriptionAgreementHookResult,
      }}
    >
      {children}
    </Context.Provider>
  );
}
