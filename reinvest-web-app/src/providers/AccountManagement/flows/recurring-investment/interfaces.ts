import { RecurringInvestment } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  _action?: 'cancel' | 'reinstate';
  activeRecurringInvestment?: RecurringInvestment;
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',

  CURRENT_RECURRING_INVESTMENT = 'CURRENT_RECURRING_INVESTMENT',
  CONFIRMATION = 'CONFIRMATION',
}
