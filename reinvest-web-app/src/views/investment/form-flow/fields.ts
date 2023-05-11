import { RecurringInvestmentInterval } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  _availableAccounts?: Maybe<AccountOverview>[];
  _hasCompletedInvestment?: boolean;
  _investmentWasSuccessful?: boolean;
  _isForIndividualAccount?: boolean;
  _selectedAccount?: AccountOverview;
  _shouldAgreeToRecurringInvestment?: boolean;
  _shouldDisplayRecurringInvestment?: boolean;
  _willSetUpRecurringInvestment?: boolean;

  agreesToOneTimeInvestment?: boolean;
  agreesToRecurringInvestment?: boolean;
  approvesSubscriptionAgreement?: boolean;
  bankAccountId?: string;
  investmentAmount?: number;
  optsInForAutomaticDividendReinvestment?: boolean;
  recurringInvestmentAmount?: number;
  recurringInvestmentDate?: Date;
  recurringInvestmentInterval?: RecurringInvestmentInterval;
}
