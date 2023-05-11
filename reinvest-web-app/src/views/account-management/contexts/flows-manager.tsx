import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { MenuItemIdentifiers } from '../enums/menu';

interface State {
  currentFlow: MenuItemIdentifiers | null;
  isModalOpen: boolean;
  setCurrentFlow: (state: MenuItemIdentifiers | null) => void;
  toggleIsModalOpen: (state: boolean) => void;
}

type PrimitiveProps = Pick<State, 'isModalOpen' | 'toggleIsModalOpen'>;
interface Props extends PropsWithChildren, PrimitiveProps {}

const Context = createContext<State>({
  isModalOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsModalOpen: () => {},
  currentFlow: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentFlow: () => {},
});

export const useFlowsManager = () => useContext(Context);

export const FlowsManagerProvider = ({ isModalOpen, toggleIsModalOpen, children }: Props) => {
  const [currentFlow, setCurrentFlow] = useState<State['currentFlow']>(null);

  return <Context.Provider value={{ currentFlow, setCurrentFlow, isModalOpen, toggleIsModalOpen }}>{children}</Context.Provider>;
};
