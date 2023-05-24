import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './interfaces';
import { STEPS } from './steps';

const [useFlow, FlowReferralRewardProvider] = createFormFlow<FlowFields>({ steps: STEPS });

export { useFlow };

function InnerFlowReferralReward() {
  const { CurrentStepView } = useFlow();

  return <CurrentStepView />;
}

export const FlowReferralReward = () => (
  <FlowReferralRewardProvider initialStoreFields={{}}>
    <InnerFlowReferralReward />
  </FlowReferralRewardProvider>
);
