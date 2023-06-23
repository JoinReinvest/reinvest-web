import { DEFAULT_MUTATION_META, DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createBankAccount: () => Promise.resolve(),
  createBankAccountLink: null,
  createBankAccountMeta: DEFAULT_MUTATION_META,
  bankAccountDisplay: null,
  currentBankAccount: null,
  currentBankAccountMeta: DEFAULT_QUERY_META,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fulfillBankAccount: () => Promise.resolve(),
  fulfillBankAccountMeta: DEFAULT_MUTATION_META,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateBankAccount: () => Promise.resolve(),
  updateBankAccountLink: null,
  updateBankAccountMeta: DEFAULT_MUTATION_META,
});
