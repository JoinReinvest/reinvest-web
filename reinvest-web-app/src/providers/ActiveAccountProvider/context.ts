import { DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  activeAccount: null,
  activeAccountStats: null,
  activeAccountStatsMeta: DEFAULT_QUERY_META,
  individualAccount: null,
  bankAccount: null,
  allAccounts: [],
  availableAccounts: [],
  isAbleToAddBeneficiaries: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateActiveAccount: () => {},
  arrivesFromOnboarding: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setArrivesFromOnboarding: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateBankAccount: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetchUserProfile: () => {},
});
