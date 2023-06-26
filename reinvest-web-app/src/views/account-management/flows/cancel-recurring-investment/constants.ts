import { RecurringInvestmentStatus } from 'reinvest-app-common/src/types/graphql';

export const STATUS_LABELS = new Map<RecurringInvestmentStatus, string>([
  [RecurringInvestmentStatus.Active, 'Active'],
  [RecurringInvestmentStatus.Suspended, 'Suspended'],
  [RecurringInvestmentStatus.Inactive, 'Inactive'],
  [RecurringInvestmentStatus.Draft, 'Draft'],
  [RecurringInvestmentStatus.WaitingForSigningSubscriptionAgreement, 'Waiting for signing subscription agreement'],
]);
