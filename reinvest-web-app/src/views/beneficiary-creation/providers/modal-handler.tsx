import { useToggler } from 'hooks/toggler';
import { createContext, PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';
import { ModalProps } from 'types/modal';

interface State {
  hasFinishedBeneficiaryCreationFlow: boolean;
  isBeneficiaryFlowOpen: boolean;
  isInvestmentFlowOpen: boolean;
  toggleHasFinishedBeneficiaryCreationFlow: (state: boolean) => void;
  toggleIsBeneficiaryFlowOpen: (state: boolean) => void;
  toggleIsInvestmentFlowOpen: (state: boolean) => void;
}

const Context = createContext<State>({
  isBeneficiaryFlowOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsBeneficiaryFlowOpen: () => {},
  isInvestmentFlowOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsInvestmentFlowOpen: () => {},
  hasFinishedBeneficiaryCreationFlow: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleHasFinishedBeneficiaryCreationFlow: () => {},
});

export const useModalHandler = createContextConsumer(Context, 'ModalHandlerProvider');

interface Props extends ModalProps, PropsWithChildren {}

export function ModalHandlerProvider({ isModalOpen: isBeneficiaryFlowOpen, onModalOpenChange: toggleIsBeneficiaryFlowOpen, children }: Props) {
  const [hasFinishedBeneficiaryCreationFlow, toggleHasFinishedBeneficiaryCreationFlow] = useToggler(false);
  const [isInvestmentFlowOpen, toggleIsInvestmentFlowOpen] = useToggler(false);

  return (
    <Context.Provider
      value={{
        isInvestmentFlowOpen,
        toggleIsInvestmentFlowOpen,
        isBeneficiaryFlowOpen,
        toggleIsBeneficiaryFlowOpen,
        hasFinishedBeneficiaryCreationFlow,
        toggleHasFinishedBeneficiaryCreationFlow,
      }}
    >
      {children}
    </Context.Provider>
  );
}
