import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './fields';
import { STEPS } from './steps';

const [useBankAccountFlowProvider, BankAccountFlowProvider] = createFormFlow<FlowFields>({
  steps: STEPS,
});

export { BankAccountFlowProvider, useBankAccountFlowProvider };
