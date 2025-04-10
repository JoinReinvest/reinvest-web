import { DEFAULT_MUTATION_META, DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  activeAccount: null,
  previousAccount: null,
  activeAccountStats: null,
  activeAccountStatsMeta: DEFAULT_QUERY_META,
  individualAccount: null,
  allAccounts: [],
  availableAccounts: [],
  isAbleToAddBeneficiaries: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateActiveAccount: () => {},
  latestAccountOnboardedId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deprecateLatestAccountOnboarded: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLatestAccountOnboardedId: () => {},
  validateActiveAccountMeta: DEFAULT_MUTATION_META,
  canOpenAccount: true,
  allAccountsMeta: DEFAULT_QUERY_META,
  arrivesFromOnboarding: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setArrivesFromOnboarding: () => {},
});
