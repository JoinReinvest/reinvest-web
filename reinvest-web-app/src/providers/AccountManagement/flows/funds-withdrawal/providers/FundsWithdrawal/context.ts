import { DEFAULT_MUTATION_META, DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  abortRequest: () => Promise.resolve(),
  abortRequestMeta: DEFAULT_MUTATION_META,
  fundsWithdrawalRequest: null,
  currentRequestMeta: DEFAULT_QUERY_META,
  createRequestDraft: () => Promise.resolve(),
  createRequestDraftMeta: DEFAULT_MUTATION_META,
  createAgreement: () => Promise.resolve(),
  createdAgreementMeta: DEFAULT_MUTATION_META,
  signAgreement: () => Promise.resolve(),
  signAgreementMeta: DEFAULT_MUTATION_META,
  simulation: null,
  simulationMeta: DEFAULT_QUERY_META,
  subscriptionAgreement: null,
  currentAgreementMeta: DEFAULT_QUERY_META,
});
