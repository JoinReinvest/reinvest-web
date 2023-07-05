import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsProjectReturnModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsStructureModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsRatingModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsUnitsModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsTotalProjectSizeModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleIsJobsCreatedModalOpen: () => {},
});
