import { createFormFlow } from 'services/form-flow';

import { LoginFormFields } from './form-fields';
import { FLOW_STEPS } from './steps';

const [useLoginFormFlow, LoginFormFlowProvider] = createFormFlow<LoginFormFields>({
  steps: FLOW_STEPS,
});

export { LoginFormFlowProvider, useLoginFormFlow };
