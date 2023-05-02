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
  recurringInvestmentAmount?: number;
  recurringInvestmentFrequency?: 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
}

export interface Investment {
  type: 'one-time' | 'recurrent';
  amount?: number;
  date?: Date;
}
