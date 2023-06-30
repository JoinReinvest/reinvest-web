import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useCreateInvestment } from './hooks/create-investment';
import { useInvestmentSummary } from './hooks/investment-summary';
import { useSubscriptionAgreement } from './hooks/subscription-agreement';

const PROVIDER_NAME = 'OneTimeInvestmentProvider';

export const useOneTimeInvestment = createContextConsumer(Context, PROVIDER_NAME);

interface Props extends PropsWithChildren {
  enabled?: boolean;
}

export function OneTimeInvestmentProvider({ children, enabled = true }: Props) {
  const { investmentId, createInvestment, createInvestmentMeta } = useCreateInvestment();
  const { investmentSummary, investmentSummaryMeta } = useInvestmentSummary({ investmentId, enabled });
  const subscriptionAgreementHookResult = useSubscriptionAgreement({ investmentId });

  return (
    <Context.Provider
      value={{ investmentId, createInvestment, createInvestmentMeta, investmentSummary, investmentSummaryMeta, ...subscriptionAgreementHookResult }}
    >
      {children}
    </Context.Provider>
  );
}
