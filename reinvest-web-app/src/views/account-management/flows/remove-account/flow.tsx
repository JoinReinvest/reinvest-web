import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { ModalWhiteWatermarkSide } from '../../../../components/ModalWhiteWatermarkSide';
import { useFlowsManager } from '../../contexts/FlowsManager';
import { FlowFields } from './interfaces';
import { STEPS } from './steps';

export const [useFlow, FlowProvider] = createFormFlow<FlowFields>({ steps: STEPS });

function InnerFlow() {
  const { isModalOpen, onModalOpenChange } = useFlowsManager();
  const { CurrentStepView, meta } = useFlow();

  if (meta.isLastStep) {
    return (
      <ModalWhiteWatermarkSide
        isModalOpen={isModalOpen}
        onModalOpenChange={onModalOpenChange}
        hideSeparator
      >
        <CurrentStepView />
      </ModalWhiteWatermarkSide>
    );
  }

  return <CurrentStepView />;
}

export const FlowRemoveAccount = () => (
  <FlowProvider initialStoreFields={{}}>
    <InnerFlow />
  </FlowProvider>
);
