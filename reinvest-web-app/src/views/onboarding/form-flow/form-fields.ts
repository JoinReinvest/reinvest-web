import { CorporationTypeValue, TrustTypeValue } from 'constants/account-types';
import { CorporationAnnualRevenue, CorporationNumberOfEmployees } from 'constants/corporation';
import { Industry } from 'constants/industries';
import { Address, DomicileType, DraftAccountType, EmploymentStatus, Experience, StatementType } from 'reinvest-app-common/src/types/graphql';

export interface OnboardingFormFields {
  // Are we displaying this as an URL or a file upload?
  address: Address | null;
  dateOfBirth: string | null;
  // Are we displaying this as an URL or a file upload?
  experience: Experience | null;
  isCompletedProfile: boolean;
  residency: DomicileType | null;
  _didDocumentIdentificationValidationSucceed?: boolean;
  _hasAuthenticatedPhoneNumber?: boolean;
  _isSocialSecurityNumberAlreadyAssigned?: boolean;
  _isSocialSecurityNumberBanned?: boolean;
  accountId?: string;
  accountType?: DraftAccountType;
  authCode?: string;
  birthCountry?: string;
  businessAddress?: Address;
  citizenshipCountry?: string;
  companyTickerSymbols?: CompanyTickerSymbol[];
  compliances?: {
    // Are you or anyone in your immediate compliances, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or greater) of the equity, associated with a FINRA member, organization, or the SEC.
    isAssociatedWithFinra?: boolean;
    // Are you or anyone in your compliances or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity holder, an officer, or member of the board of directors of a publicly traded company?
    isAssociatedWithPubliclyTradedCompany?: boolean;
    // Are you or any of your immediate family a senior political figure?
    isSeniorPoliticalFigure?: boolean;
  };

  corporationAnnualRevenue?: CorporationAnnualRevenue;

  corporationIndustry?: Industry;
  corporationLegalName?: string;
  corporationNumberOfEmployees?: CorporationNumberOfEmployees;

  corporationType?: CorporationTypeValue;

  documentsForCorporation?: File[];

  documentsForTrust?: File[];
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
    // Only required if `employmentStatus` is 'employed'
    employerName?: string;
    industry?: string;
    occupation?: string;
  };
  employmentDetails?: EmploymentDetails;

  employmentStatus?: EmploymentStatus;
  finraInstitution?: string;

  finraInstitutionName?: string;
  firstName?: string;

  household?: {
    // Are you or anyone in your immediate household, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or greater) of the equity, associated with a FINRA member, organization, or the SEC.
    isAssociatedWithFinra?: boolean;
    // Are you or anyone in your household or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity holder, an officer, or member of the board of directors of a publicly traded company?
    isAssociatedWithPubliclyTradedCompany?: boolean;
    // Are you or any of your immediate family a senior political figure?
    isSeniorPoliticalFigure?: boolean;
  };
  identificationDocument?: IdentificationDocuments;
  isAccreditedInvestor?: boolean;
  isAuthorizedSignatoryEntity?: boolean;
  lastName?: string;
  middleName?: string;
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
  phoneNumber?: string;
  phoneNumberAuthenticationCode?: string;
  profilePicture?: File | null;
  seniorPoliticalFigure?: string;
  ssn?: string;

  statementTypes?: StatementType[];
  trustLegalName?: string;
  trustType?: TrustTypeValue;
  visaType?: 'F-1' | 'H-1B' | 'L-1' | 'O-1' | 'G-4';
}

export interface CompanyTickerSymbol {
  symbol: string;
}

export interface IdentificationDocuments {
  back: File | null;
  front: File | null;
}

interface EmploymentDetails {
  employerName: string;
  industry: Industry;
  occupation: string;
}
