import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { Address, CorporateCompanyTypeEnum, DocumentFileLinkInput, DomicileType, SubscriptionAgreement } from 'reinvest-app-common/src/types/graphql';
import { RecurringInvestmentFrequency, Usd } from 'reinvest-app-common/src/types/graphql';
import { Applicant, FiduciaryEntityInformation, IndexedSchema } from 'views/onboarding/form-flow/form-fields';

export interface FlowFields {
  _address?: Address | null;
  _bankAccount?: string;
  _bankAccountType?: string;
  _currentCompanyMajorStakeholder?: IndexedSchema<Applicant>;
  _currentTrustTrusteeGrantorOrProtector?: IndexedSchema<Applicant>;
  _forInitialInvestment?: boolean;
  _hasBankAccount?: boolean;
  _hasMoreThanAnAccount?: boolean;
  _investmentWasSuccessful?: boolean;
  _isEditingCompanyMajorStakeholderApplicant?: boolean;
  _isEditingTrustTrusteeGrantorOrProtector?: boolean;
  _justAddedBankAccount?: boolean;
  _onlyRecurringInvestment?: boolean;
  _secondFailedVerifyKyc?: boolean;
  _shouldAgreeToOneTimeInvestment?: boolean;
  _shouldAgreeToRecurringInvestment?: boolean;
  _shouldDisplayRecurringInvestment?: boolean;
  _shouldUpdateCompanyData?: boolean;
  _shouldUpdateProfileDetails?: boolean;
  _shouldUpdateStakeholderData?: boolean;
  _willSetUpOneTimeInvestments?: boolean;
  _willSetUpRecurringInvestment?: boolean;
  _willUpdateBankAccount?: boolean;

  agreesToOneTimeInvestment?: boolean;
  agreesToRecurringInvestment?: boolean;
  approvesSubscriptionAgreement?: boolean;
  businessAddress?: Address;
  companyMajorStakeholderApplicants?: Applicant[];
  corporationLegalName?: string;
  corporationType?: CorporateCompanyTypeEnum;
  dateOfBirth?: string | null;
  documentsForCorporation?: DocumentFile[];
  documentsToRemove?: DocumentFileLinkInput[];
  domicile?: {
    birthCountry?: string | null;
    citizenshipCountry?: string | null;
    type?: DomicileType | null;
    visaType?: string | null;
  };
  fiduciaryEntityInformation?: FiduciaryEntityInformation;
  identificationDocuments?: DocumentFile[];
  investmentAmount?: number;
  investmentFees?: Usd | null;
  name?: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  oneTimeInvestment?: Investment;
  optsInForAutomaticDividendReinvestment?: boolean;
  recurringInvestment?: Investment;
  recurringInvestmentInterval?: RecurringInvestmentFrequency;
  recurringSubscriptionAgreement?: SubscriptionAgreement;
  residency?: DomicileType | null;
  ssn?: string;
  trustTrusteesGrantorsOrProtectors?: Applicant[];
}

export interface Investment {
  type: 'one-time' | 'recurrent';
  amount?: number;
  date?: Date;
}
