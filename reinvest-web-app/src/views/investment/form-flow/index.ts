import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './fields';
import { STEPS } from './steps';

const [useInvestmentFlow, InvestmentFlowProvider] = createFormFlow<FlowFields>({
  steps: STEPS,
});

export { InvestmentFlowProvider, useInvestmentFlow };
