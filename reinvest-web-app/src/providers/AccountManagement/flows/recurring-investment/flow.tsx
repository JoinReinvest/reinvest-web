import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './interfaces';
import { AddRecurringInvestmentModalProvider } from './providers/AddRecurringInvestmentModal';
import { STEPS } from './steps';

const [useFlow, FlowProvider] = createFormFlow<FlowFields>({ steps: STEPS });

function InnerFlow() {
  const { toggleEnableDraftQuery } = useRecurringInvestment();
  const { CurrentStepView } = useFlow();

  useEffect(() => {
    toggleEnableDraftQuery(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CurrentStepView />;
}

export const FlowCancelRecurringInvestment = () => (
  <FlowProvider initialStoreFields={{}}>
    <AddRecurringInvestmentModalProvider>
      <InnerFlow />
    </AddRecurringInvestmentModalProvider>
  </FlowProvider>
);
