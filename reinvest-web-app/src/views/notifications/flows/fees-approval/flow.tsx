import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';
import { useModalManagerContext } from 'views/notifications/providers/modal-manager';

import { STEPS } from './steps';

const [useFlow, FlowProvider] = createFormFlow({ steps: STEPS });

function InnerFlow() {
  const { isModalOpen, onModalOpenChange } = useModalManagerContext();
  const { CurrentStepView } = useFlow();

  return (
    <ModalBlackFullscreen
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
      isBackButtonEnabled={false}
    >
      <CurrentStepView />
    </ModalBlackFullscreen>
  );
}

export { useFlow };

export const Flow = () => (
  <FlowProvider initialStoreFields={{}}>
    <InnerFlow />
  </FlowProvider>
);
