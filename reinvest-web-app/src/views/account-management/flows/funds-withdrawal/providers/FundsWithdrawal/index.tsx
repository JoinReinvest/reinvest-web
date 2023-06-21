import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useAbortRequest } from './hooks/abort-request';
import { useCurrentRequest } from './hooks/current-request';
import { useSimulation } from './hooks/simulation';
import { useSubscriptionAgreement } from './hooks/subscription-agreement';

export const useFundsWithdrawalManager = createContextConsumer(Context, 'FundsWithdrawalManagerProvider');

export function FundsWithdrawalManagerProvider({ children }: PropsWithChildren) {
  const currentRequest = useCurrentRequest();
  const simulation = useSimulation();
  const subscriptionAgreement = useSubscriptionAgreement();
  const abortRequest = useAbortRequest({ ...currentRequest, ...subscriptionAgreement });

  return <Context.Provider value={{ ...currentRequest, ...simulation, ...subscriptionAgreement, ...abortRequest }}>{children}</Context.Provider>;
}
