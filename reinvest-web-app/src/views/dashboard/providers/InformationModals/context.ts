import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsDividendsModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsAppreciationModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsAdvisorFeeModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsPositionTotalModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsCostOfSharesOwnedModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsQuantityOfSharesModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsCurrentNavPerShareModalOpen: () => {},
});
