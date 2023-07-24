import { DEFAULT_MUTATION_META, DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  activeRecurringInvestment: null,
  activeRecurringInvestmentMeta: DEFAULT_QUERY_META,
  recurringInvestment: null,
  recurringInvestmentMeta: DEFAULT_QUERY_META,
  initiateRecurringInvestmentMeta: DEFAULT_MUTATION_META,
  subscriptionRecurringInvestmentAgreement: null,
  subscriptionRecurringInvestmentAgreementMeta: DEFAULT_QUERY_META,
  signRecurringInvestmentSubscriptionAgreementMeta: DEFAULT_MUTATION_META,
  createRecurringInvestmentMeta: DEFAULT_MUTATION_META,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createRecurringInvestment: () => new Promise(() => {}),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initiateRecurringInvestment: () => new Promise(() => {}),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signRecurringInvestmentSubscriptionAgreement: () => new Promise(() => {}),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deactivateRecurringInvestment: () => new Promise(() => {}),
  deactivateRecurringInvestmentMeta: DEFAULT_MUTATION_META,
  deactivateRecurringInvestmentResult: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unsuspendRecurringInvestment: () => new Promise(() => {}),
  unsuspendRecurringInvestmentMeta: DEFAULT_MUTATION_META,
  unsuspendRecurringInvestmentResult: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleEnableDraftQuery: () => {},
});
