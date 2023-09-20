import { useToggler } from 'hooks/toggler';
import { useModalCheck } from 'providers/ModalCheck';
import { createContext, PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

interface State {
  isModalNotificationsOpen: boolean;
  toggleIsModalNotificationsOpen: () => void;
}

const Context = createContext<State>({
  isModalNotificationsOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsModalNotificationsOpen: () => {},
});

export const useModalNotificationsContext = createContextConsumer(Context, 'ModalNotificationsProvider');

export const ModalNotificationsProvider = ({ children }: PropsWithChildren) => {
  const { toggleHasModalOpen } = useModalCheck();
  const [isModalNotificationsOpen, updateIsModalNotificationsOpen] = useToggler(false);

  const toggleIsModalNotificationsOpen = (state?: boolean) => {
    updateIsModalNotificationsOpen(!!state);
    toggleHasModalOpen(!!state);
  };

  return (
    <Context.Provider
      value={{
        isModalNotificationsOpen,
        toggleIsModalNotificationsOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};
