import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { FlowIdentifiers } from '../enums/flow';
import { FLOWS } from '../flows';
import { SubFlow } from '../interfaces/flows';

interface State {
  currentFlow: SubFlow | null;
  currentFlowIdentifier: FlowIdentifiers | null;
  isModalOpen: boolean;
  setCurrentFlowIdentifier: (state: FlowIdentifiers | null) => void;
  toggleIsModalOpen: (state: boolean) => void;
}

type PrimitiveProps = Pick<State, 'isModalOpen' | 'toggleIsModalOpen'>;
interface Props extends PropsWithChildren, PrimitiveProps {}

const Context = createContext<State>({
  isModalOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsModalOpen: () => {},
  currentFlow: null,
  currentFlowIdentifier: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentFlowIdentifier: () => {},
});

export const useFlowsManager = () => useContext(Context);

export const FlowsManagerProvider = ({ isModalOpen, toggleIsModalOpen, children }: Props) => {
  const [currentFlowIdentifier, setCurrentFlowIdentifier] = useState<State['currentFlowIdentifier']>(null);

  const currentFlow: State['currentFlow'] = useMemo(() => {
    if (currentFlowIdentifier) {
      const flow = FLOWS.get(currentFlowIdentifier);

      return flow || null;
    }

    return null;
  }, [currentFlowIdentifier]);

  return (
    <Context.Provider value={{ currentFlow, currentFlowIdentifier, setCurrentFlowIdentifier, isModalOpen, toggleIsModalOpen }}>{children}</Context.Provider>
  );
};
