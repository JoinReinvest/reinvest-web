import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './interfaces';
import { STEPS } from './steps';

const [useFlow, FlowProvider] = createFormFlow<FlowFields>({ steps: STEPS });

function InnerFlow() {
  const { CurrentStepView } = useFlow();

  return <CurrentStepView />;
}

export const FlowChangeInvestorExperience = () => (
  <FlowProvider initialStoreFields={{}}>
    <InnerFlow />
  </FlowProvider>
);
