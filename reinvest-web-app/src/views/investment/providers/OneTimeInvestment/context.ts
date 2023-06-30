import { DEFAULT_MUTATION_META, DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  investmentId: null,
  createInvestmentMeta: DEFAULT_MUTATION_META,
  investmentSummary: null,
  investmentSummaryMeta: DEFAULT_QUERY_META,
  subscriptionAgreement: null,
  createSubscriptionAgreementMeta: DEFAULT_MUTATION_META,
  signSubscriptionAgreementMeta: DEFAULT_MUTATION_META,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createInvestment: () => new Promise(() => {}),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signSubscriptionAgreement: () => new Promise(() => {}),
});
