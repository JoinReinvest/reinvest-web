import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  isInvestmentModalOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onInvestmentModalOpenChange: () => {},
});
