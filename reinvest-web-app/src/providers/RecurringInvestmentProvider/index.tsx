import { useToggler } from 'hooks/toggler';
import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useActiveInvestment } from './hooks/active-investment';
import { useCreateInvestment } from './hooks/create-investment';
import { useDeactivateInvestment } from './hooks/deactivate-investment';
import { useDraftInvestment } from './hooks/draft-investment';
import { useInitiateInvestment } from './hooks/initiate-investment';
import { useSubscriptionAgreement } from './hooks/subscription-agreement';
import { useUnsuspendInvestment } from './hooks/unsuspend-investment';

const PROVIDER_NAME = 'RecurringInvestmentProvider';

export const useRecurringInvestment = createContextConsumer(Context, PROVIDER_NAME);

export function RecurringInvestmentProvider({ children }: PropsWithChildren) {
  const [enableDraftQuery, toggleEnableDraftQuery] = useToggler(false);
  const activeInvestment = useActiveInvestment();
  const { recurringInvestment, recurringInvestmentMeta } = useDraftInvestment({ enableQuery: enableDraftQuery });
  const unsuspendInvestment = useUnsuspendInvestment(activeInvestment);
  const deactivateInvestment = useDeactivateInvestment(activeInvestment);
  const initiateRecurringInvestmentResult = useInitiateInvestment();
  const createRecurringInvestmentResult = useCreateInvestment({ recurringInvestmentMeta, ...activeInvestment });
  const subscriptionAgreementHookResult = useSubscriptionAgreement({ enableQuery: enableDraftQuery, recurringInvestment });

  return (
    <Context.Provider
      value={{
        recurringInvestment,
        recurringInvestmentMeta,
        ...activeInvestment,
        ...unsuspendInvestment,
        ...deactivateInvestment,
        ...createRecurringInvestmentResult,
        ...initiateRecurringInvestmentResult,
        ...subscriptionAgreementHookResult,
        toggleEnableDraftQuery,
      }}
    >
      {children}
    </Context.Provider>
  );
}
