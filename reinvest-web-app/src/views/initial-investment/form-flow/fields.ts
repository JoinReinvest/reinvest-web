import { RecurringInvestmentInterval } from 'reinvest-app-common/src/constants/recurring-investment-intervals';

export interface FlowFields {
  _hasCompletedInvestment?: boolean;
  _isForIndividualAccount?: boolean;
  _shouldAgreeToOneTimeInvestment?: boolean;
  _shouldAgreeToRecurringInvestment?: boolean;
  _willSetUpRecurringInvestments?: boolean;

  agreesToOneTimeInvestment?: boolean;
  agreesToRecurringInvestment?: boolean;
  approvesSubscriptionAgreement?: boolean;
  bankAccountId?: string;
  oneTimeInvestment?: Investment;
  optsInForAutomaticDividendReinvestment?: boolean;
  recurringInvestment?: Investment;
  recurringInvestmentInterval?: RecurringInvestmentInterval;
}

export interface Investment {
  type: 'one-time' | 'recurrent';
  amount?: number;
  date?: Date;
}
