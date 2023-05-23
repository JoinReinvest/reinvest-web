import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useCreateInvestment } from './hooks/create-investment';
import { useInvestmentSummary } from './hooks/investment-summary';
import { useSubscriptionAgreement } from './hooks/subscription-agreement';

const PROVIDER_NAME = 'InvestmentProvider';

export const useInvestmentContext = createContextConsumer(Context, PROVIDER_NAME);

export function InvestmentProvider({ children }: PropsWithChildren) {
  const { investmentId, createInvestment, createInvestmentMeta } = useCreateInvestment();
  const { investmentSummary, investmentSummaryMeta } = useInvestmentSummary({ investmentId });
  const subscriptionAgreementHookResult = useSubscriptionAgreement({ investmentId });

  return (
    <Context.Provider
      value={{ investmentId, createInvestment, createInvestmentMeta, investmentSummary, investmentSummaryMeta, ...subscriptionAgreementHookResult }}
    >
      {children}
    </Context.Provider>
  );
}
