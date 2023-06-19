import { useToggler } from 'hooks/toggler';
import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';
import { InvestmentView } from 'views/investment';

import { Context } from './context';

const PROVIDER_NAME = 'ModalManager';

export const useInvestmentFlow = createContextConsumer(Context, PROVIDER_NAME);

export function InvestmentFlowProvider({ children }: PropsWithChildren) {
  const [isInvestmentModalOpen, onInvestmentModalOpenChange] = useToggler(false);

  return (
    <Context.Provider value={{ isInvestmentModalOpen, onInvestmentModalOpenChange }}>
      <>
        {children}

        <InvestmentView
          isModalOpen={isInvestmentModalOpen}
          onModalOpenChange={onInvestmentModalOpenChange}
          withSideModal
          forInitialInvestment
        />
      </>
    </Context.Provider>
  );
}
