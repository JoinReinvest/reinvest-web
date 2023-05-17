import { RecurringInvestmentInterval } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { AccountOverview, Address, DomicileType, Maybe } from 'reinvest-app-common/src/types/graphql';

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
  address?: Address | null;
  agreesToOneTimeInvestment?: boolean;
  agreesToRecurringInvestment?: boolean;
  approvesSubscriptionAgreement?: boolean;
  bankAccountId?: string;
  dateOfBirth?: string | null;
  identificationDocuments?: DocumentFile[];
  investmentAmount?: string;
  investmentId?: string;
  name?: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  oneTimeInvestment?: Investment;
  optsInForAutomaticDividendReinvestment?: boolean;
  recurringInvestment?: Investment;

  recurringInvestmentAmount?: string;
  recurringInvestmentDate?: Date;
  recurringInvestmentInterval?: RecurringInvestmentInterval;

  residency?: DomicileType | null;
}
