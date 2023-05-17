import { ModalWhiteFullscreen } from 'components/ModalWhiteFullscreen';
import { useActiveAccount } from 'providers/ActiveAccountProvider';

import { useBankAccountFlowProvider } from './form-flow';

interface Props {
  isOpen: boolean;
  toggleIsOpen: (state: boolean) => void;
}

export const BankAccountFlow = ({ isOpen, toggleIsOpen }: Props) => {
  const { activeAccount } = useActiveAccount();
  const { CurrentStepView, meta, moveToPreviousValidStep } = useBankAccountFlowProvider();

  const onModalClickBack = () => {
    if (meta.isFirstStep) {
      toggleIsOpen(false);
    } else {
      moveToPreviousValidStep();
    }
  };

  return (
    <ModalWhiteFullscreen
      isOpen={isOpen}
      activeAccount={activeAccount}
      onOpenChange={onModalClickBack}
    >
      <CurrentStepView />
    </ModalWhiteFullscreen>
  );
};
