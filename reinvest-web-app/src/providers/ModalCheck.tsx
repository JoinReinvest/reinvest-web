import { useToggler } from 'hooks/toggler';
import { createContext, PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

interface State {
  hasModalOpen: boolean;
  toggleHasModalOpen: (state?: boolean) => void;
}

const Context = createContext<State>({
  hasModalOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleHasModalOpen: () => {},
});

export const useModalCheck = createContextConsumer(Context, 'ModalCheck');

export function ModalCheckProvider({ children }: PropsWithChildren) {
  const [hasModalOpen, toggleHasModalOpen] = useToggler();

  return <Context.Provider value={{ hasModalOpen, toggleHasModalOpen }}>{children}</Context.Provider>;
}
