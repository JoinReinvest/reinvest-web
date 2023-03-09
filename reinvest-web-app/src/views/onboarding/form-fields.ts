export interface OnboardingFormFields {
  accountType: string;
  residency: 'us' | 'green-card' | 'visa' | undefined;
  // Are we displaying this as an URL or a file upload?
  address?: {
    city?: string;
    state?: string;
    streetAddress?: string;
    streetAddress2?: string;
    zipCode?: string;
  };
  authenticationCode?: string;
  birthCountry?: string;
  // These fields are only required if residency is 'green-card' or 'visa'
  citizenshipCountry?: string;
  dateOfBirth?: Date;

  employmentDetails?: {
    // Only required if `employmentStatus` is 'employed'
    employerName?: string;
    industry?: string;
    occupation?: string;
  };
  employmentStatus?: 'employed' | 'unemployed' | 'retired' | 'student';
  // Are we displaying this as an URL or a file upload?
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
    back: string;
    front: string;
  };
  lastName?: string;
  middleName?: string;
  netIncome?: string;

  netWorth?: string;

  phoneNumber?: string;

  profilePicture?: string;

  // If `household.isAssociatedWithPubliclyTradedCompany` is true
  seniorPoliticalFigure?: string;
  // If `household.isSeniorPoliticalFigure` is true
  socialSecurityNumber?: string;

  // If `household.isAssociatedWithFinra` is true
  tickerSymbols?: string[];

  visaType?: 'F-1' | 'H-1B' | 'L-1' | 'O-1' | 'G-4';
}

export const DEFAULT_VALUES: OnboardingFormFields = {
  accountType: '',
  residency: undefined,
};
