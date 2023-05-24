import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './fields';
import { STEPS } from './steps';

const [useInitialInvestmentFlow, InitialInvestmentFormFlowProvider] = createFormFlow<FlowFields>({
  steps: STEPS,
});

export { InitialInvestmentFormFlowProvider, useInitialInvestmentFlow };
