import { useActiveAccountConfiguration } from 'providers/ActiveAccountConfigurationProvider';
import { useEffect } from 'react';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './interfaces';
import { STEPS } from './steps';

const [useFlow, FlowDividendReinvestingProvider] = createFormFlow<FlowFields>({ steps: STEPS });

function InnerFlowDividendReinvesting() {
  const { activeAccountConfiguration, hasAutomaticDividendsActive } = useActiveAccountConfiguration();
  const { CurrentStepView, updateStoreFields } = useFlow();

  useEffect(() => {
    async function initializeFields() {
      await updateStoreFields({ willOptIn: hasAutomaticDividendsActive });
    }

    initializeFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAccountConfiguration]);

  return <CurrentStepView />;
}

export const FlowDividendReinvesting = () => (
  <FlowDividendReinvestingProvider initialStoreFields={{}}>
    <InnerFlowDividendReinvesting />
  </FlowDividendReinvestingProvider>
);
