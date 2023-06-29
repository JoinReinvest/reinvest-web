import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './interfaces';
import { STEPS } from './steps';

const [useFlow, FlowProvider] = createFormFlow<FlowFields>({ steps: STEPS });

function InnerFlow() {
  const { CurrentStepView } = useFlow();

  return <CurrentStepView />;
}

export const FlowChangeName = () => {
  return (
    <FlowProvider initialStoreFields={{ name: { firstName: '', lastName: '' } }}>
      <InnerFlow />
    </FlowProvider>
  );
};
