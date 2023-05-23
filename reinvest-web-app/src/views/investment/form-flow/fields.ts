import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { AccountOverview, Address, DomicileType, Maybe } from 'reinvest-app-common/src/types/graphql';
import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';
import { Investment } from 'views/initial-investment/form-flow/fields';
import { Applicant, IndexedSchema } from 'views/onboarding/form-flow/form-fields';

export interface FlowFields {
  _hasCompletedFlow: boolean;
  bankAccount: string;
  _availableAccounts?: Maybe<AccountOverview>[];
  _currentCompanyMajorStakeholder?: IndexedSchema<Applicant>;
  _currentTrustTrusteeGrantorOrProtector?: IndexedSchema<Applicant>;
  _hasCompletedInvestment?: boolean;
  _investmentWasSuccessful?: boolean;
  _isEditingCompanyMajorStakeholderApplicant?: boolean;
  _isEditingTrustTrusteeGrantorOrProtector?: boolean;
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
  agreesToRecurringInvestment?: boolean;
  approvesSubscriptionAgreement?: boolean;
  bankAccountId?: string;
  companyMajorStakeholderApplicants?: Applicant[];
  corporationLegalName?: string;
  dateOfBirth?: string | null;
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
    type?: DomicileType | null;
  };
  identificationDocuments?: DocumentFile[];
  investmentAmount?: number;
  investmentId?: string;
  name?: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };

  oneTimeInvestment?: Investment;
  optsInForAutomaticDividendReinvestment?: boolean;
  recurringInvestment?: Investment;
  recurringInvestmentAmount?: number;

  recurringInvestmentDate?: Date;
  recurringInvestmentInterval?: RecurringInvestmentFrequency;
  residency?: DomicileType | null;

  trustTrusteesGrantorsOrProtectors?: Applicant[];
}
