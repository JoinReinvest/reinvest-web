import { useToggler } from 'hooks/toggler';
import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';

const PROVIDER_NAME = 'ModalManager';

export const useModalManager = createContextConsumer(Context, PROVIDER_NAME);

export function ModalManagerProvider({ children }: PropsWithChildren) {
  const [isInvestmentModalOpen, onInvestmentModalOpenChange] = useToggler(false);

  return <Context.Provider value={{ isInvestmentModalOpen, onInvestmentModalOpenChange }}>{children}</Context.Provider>;
}
