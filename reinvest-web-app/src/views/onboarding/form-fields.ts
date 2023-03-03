export interface OnboardingFormFields {
  accountType: 'individual';
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  authenticationCode?: string;
  dateOfBirth?: Date;
  residency: 'us' | 'green-card' | 'visa';

  // These fields are only required if residency is 'green-card' or 'visa'
  citizenshipCountry?: string;
  birthCountry?: string;
  visaType?: 'F-1' | 'H-1B' | 'L-1' | 'O-1' | 'G-4';

  household?: {
    // Are you or anyone in your immediate household, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or greater) of the equity, associated with a FINRA member, organization, or the SEC.
    isAssociatedWithFinra?: boolean;
    // Are you or anyone in your household or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity holder, an officer, or member of the board of directors of a publicly traded company?
    isAssociatedWithPubliclyTradedCompany?: boolean;
    // Are you or any of your immediate family a senior political figure?
    isSeniorPoliticalFigure?: boolean;
  }

  finraInstitution?: string; // If `household.isAssociatedWithFinra` is true
  tickerSymbols?: string[]; // If `household.isAssociatedWithPubliclyTradedCompany` is true
  seniorPoliticalFigure?: string; // If `household.isSeniorPoliticalFigure` is true
  socialSecurityNumber?: string;
  documentForVerification?: string; // Are we displaying this as an URL or a file upload?

  address?: {
    streetAddress?: string;
    streetAddress2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  }

  employmentStatus?: 'employed' | 'unemployed' | 'retired' | 'student';

  employment: { // Only required if `employmentStatus` is 'employed'
    employerName?: string;
    occupation?: string;
    industry?: string;
  }

  netIncome?: string;
  netWorth?: string;

  profilePicture?: string; // Are we displaying this as an URL or a file upload?
};
