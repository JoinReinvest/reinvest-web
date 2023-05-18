import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';

import { Investment } from '../../initial-investment/form-flow/fields';

export interface FlowFields {
  _hasCompletedFlow: boolean;
  bankAccount: string;
  _availableAccounts?: Maybe<AccountOverview>[];
  _hasCompletedInvestment?: boolean;
  _investmentWasSuccessful?: boolean;
  _isForIndividualAccount?: boolean;
  _selectedAccount?: AccountOverview;
  _shouldAgreeToOneTimeInvestment?: boolean;
  _shouldAgreeToRecurringInvestment?: boolean;
  _shouldDisplayRecurringInvestment?: boolean;
  _willSetUpOneTimeInvestments?: boolean;
  _willSetUpRecurringInvestment?: boolean;

  _willSetUpRecurringInvestments?: boolean;
  agreesToOneTimeInvestment?: boolean;
  agreesToRecurringInvestment?: boolean;
  approvesSubscriptionAgreement?: boolean;
  bankAccountId?: string;
  investmentAmount?: number;
  investmentId?: string;
  oneTimeInvestment?: Investment;
  optsInForAutomaticDividendReinvestment?: boolean;
  recurringInvestment?: Investment;

  recurringInvestmentAmount?: number;
  recurringInvestmentDate?: Date;
  recurringInvestmentInterval?: RecurringInvestmentFrequency;
}
