import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { RegisterFormFields } from './form-fields';
import { FLOW_STEPS } from './steps';

const [useRegisterFormFlow, RegisterFormFlowProvider] = createFormFlow<RegisterFormFields>({
  steps: FLOW_STEPS,
});

export { RegisterFormFlowProvider, useRegisterFormFlow };
