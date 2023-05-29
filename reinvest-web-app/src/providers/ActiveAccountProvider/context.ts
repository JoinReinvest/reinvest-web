import { DEFAULT_MUTATION_META, DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  userProfile: null,
  userProfileMeta: DEFAULT_QUERY_META,
  activeAccount: null,
  previousAccount: null,
  activeAccountStats: null,
  activeAccountStatsMeta: DEFAULT_QUERY_META,
  individualAccount: null,
  bankAccount: null,
  allAccounts: [],
  availableAccounts: [],
  isAbleToAddBeneficiaries: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateActiveAccount: () => {},
  latestAccountOnboardedId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deprecateLatestAccountOnboarded: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateBankAccount: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLatestAccountOnboardedId: () => {},
  isAccountBanned: false,
  validateActiveAccountMeta: DEFAULT_MUTATION_META,
});
