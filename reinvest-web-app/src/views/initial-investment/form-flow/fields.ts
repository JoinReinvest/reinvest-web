import { RecurringInvestmentInterval } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { AccountOverview, Address, DomicileType, Maybe } from 'reinvest-app-common/src/types/graphql';

import { Applicant, IndexedSchema } from '../../onboarding/form-flow/form-fields';

export interface FlowFields {
  _currentTrustTrusteeGrantorOrProtector: IndexedSchema<Applicant>;
  _hasCompletedFlow: boolean;
  bankAccount: string;
  _availableAccounts?: Maybe<AccountOverview>[];
  _currentCompanyMajorStakeholder?: IndexedSchema<Applicant>;
  _hasCompletedInvestment?: boolean;
  _investmentWasSuccessful?: boolean;
  _isEditingCompanyMajorStakeholderApplicant?: boolean;
  _isEditingTrustTrusteeGrantorOrProtector?: boolean;
  _isForIndividualAccount?: boolean;
  _selectedAccount?: AccountOverview;
  _shouldAgreeToOneTimeInvestment?: boolean;
  _shouldAgreeToRecurringInvestment?: boolean;

  _shouldDisplayRecurringInvestment?: boolean;
  _shouldUpdateProfileDetails?: boolean;
  _willSetUpOneTimeInvestments?: boolean;
  _willSetUpRecurringInvestment?: boolean;
  _willSetUpRecurringInvestments?: boolean;
  address?: Address | null;
  agreesToOneTimeInvestment?: boolean;
  domicile?: {
    forGreenCard?: {
      birthCountry: string;
      citizenshipCountry: string;
    };
    forVisa?: {
      birthCountry: string;
      citizenshipCountry: string;
      visaType: string;
    };
  };
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

  companyMajorStakeholderApplicants?: Applicant[];
  corporationLegalName?: string;
  trustTrusteesGrantorsOrProtectors?: Applicant[];
  bankAccountId?: string;
  approvesSubscriptionAgreement?: boolean;
  dateOfBirth?: string | null;
  agreesToRecurringInvestment?: boolean;
}

export interface Investment {
  type: 'one-time' | 'recurrent';
  amount?: string;
  date?: Date;
}
