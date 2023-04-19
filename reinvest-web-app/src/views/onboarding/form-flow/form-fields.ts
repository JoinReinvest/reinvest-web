import { CorporationAnnualRevenue, CorporationNumberOfEmployees } from 'reinvest-app-common/src/constants/corporation';
import { Industry } from 'reinvest-app-common/src/constants/industries';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import {
  Address,
  CorporateCompanyType,
  DomicileType,
  DraftAccountType,
  EmploymentStatus,
  Experience,
  SimplifiedDomicileType,
  StatementType,
  TrustCompanyTypeEnum,
} from 'reinvest-app-common/src/types/graphql';

export interface OnboardingFormFields {
  address: Address | null;
  dateOfBirth: string | null;
  experience: Experience | null;
  isCompletedProfile: boolean;
  residency: DomicileType | null;
  _currentCompanyMajorStakeholder?: IndexedSchema<Applicant>;
  _currentTrustTrusteeGrantorOrProtector?: IndexedSchema<Applicant>;
  _didDocumentIdentificationValidationSucceed?: boolean;
  _hasAuthenticatedPhoneNumber?: boolean;
  _isEditingCompanyMajorStakeholderApplicant?: boolean;
  _isEditingTrustTrusteeGrantorOrProtector?: boolean;
  _isPhoneCompleted?: boolean;
  _isSocialSecurityNumberAlreadyAssigned?: boolean;
  _isSocialSecurityNumberBanned?: boolean;
  _willHaveMajorStakeholderApplicants?: boolean;
  _willHaveTrustTrusteesGrantorsOrProtectors?: boolean;
  accountId?: string;
  accountType?: DraftAccountType;
  authCode?: string;
  authenticationCode?: string;
  birthCountry?: string;
  businessAddress?: Address;
  citizenshipCountry?: string;
  companyMajorStakeholderApplicants?: Applicant[];
  companyTickerSymbols?: CompanyTickerSymbol[];
  compliances?: Compliances;
  corporationLegalName?: string;
  corporationType?: CorporateCompanyType;
  documentsForCorporation?: DocumentFile[];
  documentsForTrust?: DocumentFile[];
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
  ein?: string;
  employment?: {
    employerName?: string;
    industry?: string;
    occupation?: string;
  };
  employmentDetails?: EmploymentDetails;
  employmentStatus?: EmploymentStatus;
  fiduciaryEntityInformation?: FiduciaryEntityInformation;
  finraInstitution?: string;
  finraInstitutionName?: string;
  identificationDocuments?: DocumentFile[];
  isAccreditedInvestor?: boolean;
  isAuthorizedSignatoryEntity?: boolean;
  name?: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  netIncome?: string;
  netWorth?: string;
  permanentAddress?: Address;
  phone?: {
    countryCode?: string;
    number?: string;
  };
  phoneNumberAuthenticationCode?: string;
  profilePicture?: DocumentFile | null;
  seniorPoliticalFigure?: string;
  ssn?: string;
  statementTypes?: StatementType[];
  trustLegalName?: string;
  trustTrusteesGrantorsOrProtectors?: Applicant[];
  trustType?: TrustCompanyTypeEnum;
  visaType?: 'F-1' | 'H-1B' | 'L-1' | 'O-1' | 'G-4';
}

export interface CompanyTickerSymbol {
  symbol: string;
}

interface EmploymentDetails {
  employerName: string;
  industry: Industry;
  occupation: string;
}

interface Compliances {
  doNoneApply?: boolean;
  isAssociatedWithFinra?: boolean;
  isAssociatedWithPubliclyTradedCompany?: boolean;
  isSeniorPoliticalFigure?: boolean;
}

interface FiduciaryEntityInformation {
  annualRevenue?: CorporationAnnualRevenue;
  industry?: Industry;
  numberOfEmployees?: CorporationNumberOfEmployees;
}

export interface Applicant {
  dateOfBirth?: Date;
  domicile?: SimplifiedDomicileType.Resident | SimplifiedDomicileType.Citizen;
  firstName?: string;
  idScan?: { fileName: string; id: string }[];
  identificationDocument?: DocumentFile;
  lastName?: string;
  middleName?: string;
  residentialAddress?: string;
  socialSecurityNumber?: string;
}

export type IndexedSchema<Schema> = Schema & {
  _index?: number;
};
