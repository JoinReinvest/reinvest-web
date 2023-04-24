import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { BeneficiaryCreationFormFields } from './form-fields';
import { FLOW_STEPS } from './steps';

const [useBeneficiaryCreationFlow, BeneficiaryCreationFlowProvider] = createFormFlow<BeneficiaryCreationFormFields>({
  steps: FLOW_STEPS,
});

export { BeneficiaryCreationFlowProvider, useBeneficiaryCreationFlow };
