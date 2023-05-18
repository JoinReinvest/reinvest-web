import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './interfaces';
import { STEPS } from './steps';

const [useFlow, FlowManageDividendsProvider] = createFormFlow<FlowFields>({ steps: STEPS });

export { useFlow };

function InnerManageDividendsFlow() {
  const { CurrentStepView } = useFlow();

  return <CurrentStepView />;
}

export const FlowManageDividends = () => (
  <FlowManageDividendsProvider initialStoreFields={{}}>
    <InnerManageDividendsFlow />
  </FlowManageDividendsProvider>
);
