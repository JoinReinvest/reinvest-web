import { useToggler } from 'hooks/toggler';
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
  const [isModalNotificationsOpen, toggleIsModalNotificationsOpen] = useToggler(false);

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
