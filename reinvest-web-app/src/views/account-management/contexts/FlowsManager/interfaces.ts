import { PropsWithChildren } from 'react';

import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';

export interface State {
  currentFlow: SubFlow | null;
  currentFlowIdentifier: FlowIdentifiers | null;
  isModalOpen: boolean;
  modalTitle: string;
  onModalOpenChange: (state: boolean) => void;
  setCurrentFlowIdentifier: (state: FlowIdentifiers | null) => void;
}

type PrimitiveProps = Pick<State, 'isModalOpen'>;
export interface ProviderProps extends PropsWithChildren, PrimitiveProps {
  toggleIsModalOpen: (state: boolean) => void;
}
