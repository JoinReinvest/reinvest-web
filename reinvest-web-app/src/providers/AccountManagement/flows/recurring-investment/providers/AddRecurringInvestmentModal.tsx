import { useToggler } from 'hooks/toggler';
import { useAccountManagement } from 'providers/AccountManagement';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { createContext, PropsWithChildren, useContext } from 'react';
import { ModalProps } from 'types/modal';
import { InvestmentView } from 'views/investment';

type State = ModalProps;

const Context = createContext<State>({
  isModalOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onModalOpenChange: () => {},
});

export const useAddRecurringInvestmentModal = () => useContext(Context);

export function AddRecurringInvestmentModalProvider({ children }: PropsWithChildren) {
  const { setCurrentFlowIdentifier } = useAccountManagement();
  const [isModalOpen, toggleIsModalOpen] = useToggler(false);
  const { activeRecurringInvestmentMeta } = useRecurringInvestment();

  function onModalOpenChange(state: boolean) {
    toggleIsModalOpen(state);

    if (!state) {
      setCurrentFlowIdentifier(null);
      activeRecurringInvestmentMeta.refetch();
    }
  }

  return (
    <>
      <Context.Provider value={{ isModalOpen, onModalOpenChange }}>
        <>
          {children}

          <InvestmentView
            isModalOpen={isModalOpen}
            onModalOpenChange={onModalOpenChange}
            forInitialInvestment
            withSideModal
            onlyRecurringInvestment
            transparentOverlay
          />
        </>
      </Context.Provider>
    </>
  );
}
