import { useToggler } from 'hooks/toggler';
import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { AdvisorFeeModal } from './modals/AdvisorFee';
import { AppreciationModal } from './modals/Appreciation';
import { CostOfSharesOwnedModal } from './modals/CostOfSharesOwned';
import { CurrentNavPerShareModal } from './modals/CurrentNavPerShare';
import { DividendsModal } from './modals/Dividends';
import { PositionTotalModal } from './modals/PositionTotal';
import { QuantityOfSharesModal } from './modals/QuantityOfShares';

const PROVIDER_NAME = 'InformationModalsProvider';

export const useInformationModals = createContextConsumer(Context, PROVIDER_NAME);

export function InformationModalsProvider({ children }: PropsWithChildren) {
  const [isDividendsModalOpen, toggleIsDividendsModalOpen] = useToggler(false);
  const [isAppreciationModalOpen, toggleIsAppreciationModalOpen] = useToggler(false);
  const [isAdvisorFeeModalOpen, toggleIsAdvisorFeeModalOpen] = useToggler(false);
  const [isPositionTotalModalOpen, toggleIsPositionTotalModalOpen] = useToggler(false);
  const [isCostOfSharesOwnedModalOpen, toggleIsCostOfSharesOwnedModalOpen] = useToggler(false);
  const [isQuantityOfSharesModalOpen, toggleIsQuantityOfSharesModalOpen] = useToggler(false);
  const [isCurrentNavPerShareModalOpen, toggleIsCurrentNavPerShareModalOpen] = useToggler(false);

  return (
    <Context.Provider
      value={{
        toggleIsCostOfSharesOwnedModalOpen,
        toggleIsQuantityOfSharesModalOpen,
        toggleIsCurrentNavPerShareModalOpen,
        toggleIsPositionTotalModalOpen,
        toggleIsAdvisorFeeModalOpen,
        toggleIsDividendsModalOpen,
        toggleIsAppreciationModalOpen,
      }}
    >
      <>
        {children}

        <AdvisorFeeModal
          isModalOpen={isAdvisorFeeModalOpen}
          onModalOpenChange={toggleIsAdvisorFeeModalOpen}
        />

        <AppreciationModal
          isModalOpen={isAppreciationModalOpen}
          onModalOpenChange={toggleIsAppreciationModalOpen}
        />

        <CostOfSharesOwnedModal
          isModalOpen={isCostOfSharesOwnedModalOpen}
          onModalOpenChange={toggleIsCostOfSharesOwnedModalOpen}
        />

        <CurrentNavPerShareModal
          isModalOpen={isCurrentNavPerShareModalOpen}
          onModalOpenChange={toggleIsCurrentNavPerShareModalOpen}
        />

        <DividendsModal
          isModalOpen={isDividendsModalOpen}
          onModalOpenChange={toggleIsDividendsModalOpen}
        />

        <PositionTotalModal
          isModalOpen={isPositionTotalModalOpen}
          onModalOpenChange={toggleIsPositionTotalModalOpen}
        />

        <QuantityOfSharesModal
          isModalOpen={isQuantityOfSharesModalOpen}
          onModalOpenChange={toggleIsQuantityOfSharesModalOpen}
        />
      </>
    </Context.Provider>
  );
}
