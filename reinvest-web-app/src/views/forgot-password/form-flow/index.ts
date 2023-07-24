import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { ForgotPasswordFormFields } from './form-fields';
import { FLOW_STEPS } from './steps';

const [useForgotPasswordFormFlow, ForgotPasswordFormFlowProvider] = createFormFlow<ForgotPasswordFormFields>({
  steps: FLOW_STEPS,
});

export { ForgotPasswordFormFlowProvider, useForgotPasswordFormFlow };
