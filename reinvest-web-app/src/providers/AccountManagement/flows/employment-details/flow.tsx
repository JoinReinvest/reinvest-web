import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { STEPS } from './steps';

const [useFlow, FlowProvider] = createFormFlow({ steps: STEPS });

function InnerFlow() {
  const { CurrentStepView } = useFlow();

  return <CurrentStepView />;
}

export const Flow = () => (
  <FlowProvider initialStoreFields={{}}>
    <InnerFlow />
  </FlowProvider>
);
