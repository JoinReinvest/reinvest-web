import { NotificationType } from 'reinvest-app-common/src/types/graphql';

import { FlowIdentifiers } from './flows/identifiers';

export const NOTIFICATION_TYPE_FLOWS = new Map<NotificationType, FlowIdentifiers>([
  [NotificationType.DividendReceived, FlowIdentifiers.MANAGE_DIVIDENDS],
  [NotificationType.RewardDividendReceived, FlowIdentifiers.REFERRAL_REWARD],
  [NotificationType.InvestmentFailed, FlowIdentifiers.INVESTMENT_FAILED],
  [NotificationType.RecurringInvestmentFailed, FlowIdentifiers.RECURRING_INVESTMENT_FAILED],
  [NotificationType.FeesApprovalRequired, FlowIdentifiers.APPROVE_FEES],
]);

export const ACTIONABLE_NOTIFICATIONS = [...NOTIFICATION_TYPE_FLOWS.keys()];
