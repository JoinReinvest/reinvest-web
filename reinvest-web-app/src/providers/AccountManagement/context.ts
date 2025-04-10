import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  modalTitle: '',
  isModalOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onModalOpenChange: () => {},
  currentFlow: null,
  currentFlowIdentifier: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setQueryFlow: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentFlowIdentifier: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleShouldRefetchAccounts: () => {},
  queryFlowIdentifier: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deprecateQueryFlow: () => {},
});
