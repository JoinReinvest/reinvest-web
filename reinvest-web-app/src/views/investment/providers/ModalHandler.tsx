import { createContext, PropsWithChildren, useContext } from 'react';

interface State {
  onModalLastStep?: Props['onModalLastStep'];
}

interface Props extends PropsWithChildren {
  onModalLastStep: () => void;
}

const Context = createContext<State>({});

export const useModalHandler = () => useContext(Context);

export const ModalHandlerProvider = ({ onModalLastStep, children }: Props) => <Context.Provider value={{ onModalLastStep }}>{children}</Context.Provider>;
