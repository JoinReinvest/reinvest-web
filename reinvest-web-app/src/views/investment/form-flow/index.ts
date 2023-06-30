import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './fields';
import { STEPS } from './steps';

const [useFlow, FlowProvider] = createFormFlow<FlowFields>({
  steps: STEPS,
});

export { FlowProvider, useFlow };
