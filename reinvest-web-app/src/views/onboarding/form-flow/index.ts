import { createFormFlow } from 'services/form-flow';

import { OnboardingFormFields } from './form-fields';
import { FLOW_STEPS } from './steps';

const [useOnboardingFormFlow, OnboardingFormFlowProvider] = createFormFlow<OnboardingFormFields>({
  steps: FLOW_STEPS,
});

export { OnboardingFormFlowProvider, useOnboardingFormFlow };
