import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useCancelInvestment } from './hooks/cancel-investment';
import { useInvestmentsList } from './hooks/investments-list';

const PROVIDER_NAME = 'InvestmentHistoryProvider';

/**
 * A wrapper to cancel investments and refetch investment history.
 */
export const useInvestmentHistory = createContextConsumer(Context, PROVIDER_NAME);

export function InvestmentHistoryProvider({ children }: PropsWithChildren) {
  const { investmentsList, investmentsListMeta } = useInvestmentsList();
  const investmentCancellation = useCancelInvestment({ investmentsListMeta });

  return <Context.Provider value={{ investmentsList, investmentsListMeta, ...investmentCancellation }}>{children}</Context.Provider>;
}
