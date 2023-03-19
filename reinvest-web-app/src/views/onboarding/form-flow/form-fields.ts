import { CorporationTypeValue, TrustTypeValue } from 'constants/account-types';
import { DomicileType, EmploymentStatus, StatementType } from 'types/graphql';

export interface OnboardingFormFields {
  accountType: string;
  domicile: {
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
  employment: {
    // Only required if `employmentStatus` is 'employed'
    employerName?: string;
    industry?: string;
    occupation?: string;
  };
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  phone: {
    countryCode?: string;
    number?: string;
  };
  _didDocumentIdentificationValidationSucceed?: boolean;
  _isSocialSecurityNumberAlreadyAssigned?: boolean;
  _isSocialSecurityNumberBanned?: boolean;
  // Are we displaying this as an URL or a file upload?
  address?: {
    city?: string;
    state?: string;
    streetAddress?: string;
    streetAddress2?: string;
    zipCode?: string;
  };
  authCode?: string;
  birthCountry?: string;
  // These fields are only required if residency is 'green-card' or 'visa'
  citizenshipCountry?: string;
  // If `compliances.isAssociatedWithFinra` is true
  companyTickerSymbols?: CompanyTickerSymbol[];

  compliances?: {
    // Are you or anyone in your immediate compliances, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or greater) of the equity, associated with a FINRA member, organization, or the SEC.
    isAssociatedWithFinra?: boolean;
    // Are you or anyone in your compliances or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity holder, an officer, or member of the board of directors of a publicly traded company?
    isAssociatedWithPubliclyTradedCompany?: boolean;
    // Are you or any of your immediate family a senior political figure?
    isSeniorPoliticalFigure?: boolean;
  };
  corporationType?: CorporationTypeValue;

  dateOfBirth?: string;

  employmentDetails?: {
    // Only required if `employmentStatus` is 'employed'
    employerName?: string;
    industry?: string;
    occupation?: string;
  };
  employmentStatus?: EmploymentStatus;
  // Are we displaying this as an URL or a file upload?
  experience?: 'no-experience' | 'some-experience' | 'very-experienced' | 'expert';
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

  identificationDocument?: {
    back: File | null;
    front: File | null;
  };
  isAssociatedWithFinra?: boolean;
  lastName?: string;

  middleName?: string;
  netIncome?: string;

  netWorth?: string;

  profilePicture?: File | null;
  residency?: DomicileType;
  // If `compliances.isAssociatedWithPubliclyTradedCompany` is true
  seniorPoliticalFigure?: string;

  socialSecurityNumber?: string;

  statementType?: StatementType;
  trustType?: TrustTypeValue;
  visaType?: 'F-1' | 'H-1B' | 'L-1' | 'O-1' | 'G-4';
}

export interface CompanyTickerSymbol {
  symbol: string;
}
