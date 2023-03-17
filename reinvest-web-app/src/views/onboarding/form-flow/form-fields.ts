import { AccountTypeValue, CorporationTypeValue, TrustTypeValue } from 'constants/account-types';
import { CorporationAnnualRevenue, CorporationNumberOfEmployees } from 'constants/corporation';
import { Industry } from 'constants/industries';

export interface OnboardingFormFields {
  residency: 'us' | 'green-card' | 'visa' | undefined;

  _didDocumentIdentificationValidationSucceed?: boolean;
  _isSocialSecurityNumberAlreadyAssigned?: boolean;
  _isSocialSecurityNumberBanned?: boolean;
  accountType?: AccountTypeValue;

  address?: {
    city?: string;
    state?: string;
    streetAddress?: string;
    streetAddress2?: string;
    zipCode?: string;
  };
  authenticationCode?: string;
  birthCountry?: string;
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
  corporationNumberOfEmployees?: CorporationNumberOfEmployees;
  corporationType?: CorporationTypeValue;
  dateOfBirth?: Date;

  documentsForCorporation?: File[];
  documentsForTrust?: File[];

  employmentDetails?: {
    employerName?: string;
    industry?: Industry;
    occupation?: string;
  };
  employmentStatus?: 'employed' | 'unemployed' | 'retired' | 'student';
  experience?: 'no-experience' | 'some-experience' | 'very-experienced' | 'expert';

  finraInstitution?: string;

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
  lastName?: string;

  middleName?: string;

  netIncome?: string;
  netWorth?: string;
  phoneNumber?: string;
  profilePicture?: File | null;
  seniorPoliticalFigure?: string;
  socialSecurityNumber?: string;
  trustLegalName?: string;
  trustType?: TrustTypeValue;
  visaType?: 'F-1' | 'H-1B' | 'L-1' | 'O-1' | 'G-4';
}

export interface CompanyTickerSymbol {
  symbol: string;
}
