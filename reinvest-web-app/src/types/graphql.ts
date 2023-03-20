/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  Boolean: boolean;
  EmailAddress: any;
  Float: number;
  ID: string;
  ISODate: any;
  Int: number;
  String: string;
  firstName_String_NotNull_minLength_1: any;
  inCents_Int_NotNull_min_0: any;
  lastName_String_NotNull_minLength_1: any;
  numberOfLinks_Int_NotNull_min_1_max_10: any;
  ssn_String_NotNull_pattern_093092094: any;
};

export type AccountOverview = {
  __typename?: 'AccountOverview';
  avatar?: Maybe<GetAvatarLink>;
  id?: Maybe<Scalars['String']>;
  positionTotal?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export enum AccountType {
  Beneficiary = 'BENEFICIARY',
  Corporate = 'CORPORATE',
  Individual = 'INDIVIDUAL',
  Trust = 'TRUST',
}

/** Only one of these statements can be valid */
export type AccreditedInvestorInput = {
  statement: AccreditedInvestorStatement;
};

export enum AccreditedInvestorStatement {
  IAmAnAccreditedInvestor = 'I_AM_AN_ACCREDITED_INVESTOR',
  IAmNotExceeding_10PercentOfMyNetWorthOrAnnualIncome = 'I_AM_NOT_EXCEEDING_10_PERCENT_OF_MY_NET_WORTH_OR_ANNUAL_INCOME',
}

export type Address = {
  __typename?: 'Address';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  addressLine1: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
  addressLine2?: InputMaybe<Scalars['String']>;
};

export type AnnualRevenueInput = {
  revenue: Scalars['String'];
};

export type CompanyNameInput = {
  name: Scalars['String'];
};

export enum CorporateCompanyType {
  Corporation = 'CORPORATION',
  Llc = 'LLC',
  Partnership = 'PARTNERSHIP',
}

export type CorporateCompanyTypeInput = {
  type: CorporateCompanyType;
};

/** [MOCK] */
export type CorporateDraftAccount = {
  __typename?: 'CorporateDraftAccount';
  address?: Maybe<Address>;
  annualRevenue?: Maybe<Scalars['String']>;
  avatar?: Maybe<GetAvatarLink>;
  companyDocuments?: Maybe<Array<Maybe<FileLinkId>>>;
  companyType?: Maybe<CorporateCompanyType>;
  ein?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  industry?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  numberOfEmployees?: Maybe<Scalars['String']>;
  stakeholders?: Maybe<Array<Maybe<Stakeholder>>>;
};

export type CorporateDraftAccountInput = {
  address?: InputMaybe<AddressInput>;
  annualRevenue?: InputMaybe<AnnualRevenueInput>;
  avatar?: InputMaybe<FileLinkInput>;
  companyDocuments?: InputMaybe<Array<InputMaybe<FileLinkInput>>>;
  companyType?: InputMaybe<CorporateCompanyTypeInput>;
  ein?: InputMaybe<EinInput>;
  industry?: InputMaybe<IndustryInput>;
  name?: InputMaybe<CompanyNameInput>;
  numberOfEmployees?: InputMaybe<NumberOfEmployeesInput>;
  removeDocuments?: InputMaybe<Array<InputMaybe<FileLinkInput>>>;
  removeStakeholders?: InputMaybe<Array<InputMaybe<SsnInput>>>;
  stakeholders?: InputMaybe<Array<InputMaybe<StakeholderInput>>>;
};

export type Dollar = {
  __typename?: 'Dollar';
  display?: Maybe<Scalars['String']>;
  inCents?: Maybe<Scalars['Int']>;
};

export type DollarInput = {
  inCents: Scalars['inCents_Int_NotNull_min_0'];
  formatted?: InputMaybe<Scalars['String']>;
};

export type Domicile = {
  __typename?: 'Domicile';
  birthCountry?: Maybe<Scalars['String']>;
  citizenshipCountry?: Maybe<Scalars['String']>;
  type?: Maybe<DomicileType>;
  visaType?: Maybe<Scalars['String']>;
};

/**
 * An investor statement of domicile type.
 * Choose the right one and add details depending on the chosen type
 */
export type DomicileInput = {
  type: DomicileType;
  forGreenCard?: InputMaybe<GreenCardInput>;
  forVisa?: InputMaybe<VisaInput>;
};

export enum DomicileType {
  Citizen = 'CITIZEN',
  GreenCard = 'GREEN_CARD',
  Visa = 'VISA',
}

export type DraftAccount = {
  __typename?: 'DraftAccount';
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<DraftAccountType>;
};

export enum DraftAccountState {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Opened = 'OPENED',
}

export enum DraftAccountType {
  Corporate = 'CORPORATE',
  Individual = 'INDIVIDUAL',
  Trust = 'TRUST',
}

export type EinInput = {
  ein: Scalars['String'];
};

export type EmailInput = {
  email: Scalars['EmailAddress'];
};

export type Employer = {
  __typename?: 'Employer';
  industry?: Maybe<Scalars['String']>;
  nameOfEmployer?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EmployerInput = {
  industry: Scalars['String'];
  nameOfEmployer: Scalars['String'];
  title: Scalars['String'];
};

export enum EmploymentStatus {
  Employed = 'EMPLOYED',
  Retired = 'RETIRED',
  Student = 'STUDENT',
  Unemployed = 'UNEMPLOYED',
}

export type EmploymentStatusInput = {
  status: EmploymentStatus;
};

export type EmploymentStatusType = {
  __typename?: 'EmploymentStatusType';
  status?: Maybe<EmploymentStatus>;
};

export enum Experience {
  Expert = 'EXPERT',
  NoExperience = 'NO_EXPERIENCE',
  SomeExperience = 'SOME_EXPERIENCE',
  VeryExperienced = 'VERY_EXPERIENCED',
}

export type ExperienceInput = {
  experience?: InputMaybe<Experience>;
};

export type FinraStatementInput = {
  name: Scalars['String'];
};

/** Link id */
export type FileLinkId = {
  __typename?: 'FileLinkId';
  id?: Maybe<Scalars['String']>;
};

/** Link id input */
export type FileLinkInput = {
  /** This is @PutFileLink.id */
  id: Scalars['String'];
};

export type GenericFieldInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

/** Link id + url to read the avatar */
export type GetAvatarLink = {
  __typename?: 'GetAvatarLink';
  id?: Maybe<Scalars['String']>;
  initials?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** Link id + url to read the document */
export type GetDocumentLink = {
  __typename?: 'GetDocumentLink';
  id?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type GreenCardInput = {
  birthCountry: Scalars['String'];
  citizenshipCountry: Scalars['String'];
};

export type IndividualAccount = {
  __typename?: 'IndividualAccount';
  avatar?: Maybe<GetAvatarLink>;
  details?: Maybe<IndividualAccountDetails>;
  id?: Maybe<Scalars['String']>;
  positionTotal?: Maybe<Scalars['String']>;
};

export type IndividualAccountDetails = {
  __typename?: 'IndividualAccountDetails';
  employer?: Maybe<Employer>;
  employmentStatus?: Maybe<EmploymentStatusType>;
  netIncome?: Maybe<NetRange>;
  netWorth?: Maybe<NetRange>;
};

export type IndividualAccountInput = {
  avatar?: InputMaybe<FileLinkInput>;
  employer?: InputMaybe<EmployerInput>;
  employmentStatus?: InputMaybe<EmploymentStatusInput>;
  netIncome?: InputMaybe<NetRangeInput>;
  netWorth?: InputMaybe<NetRangeInput>;
  /** Send this field if you want to finish the onboarding. In case of success verification, onboarding will be considered as completed */
  verifyAndFinish?: InputMaybe<Scalars['Boolean']>;
};

export type IndividualDraftAccount = {
  __typename?: 'IndividualDraftAccount';
  avatar?: Maybe<GetAvatarLink>;
  details?: Maybe<IndividualDraftAccountDetails>;
  id?: Maybe<Scalars['ID']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  state?: Maybe<DraftAccountState>;
};

export type IndividualDraftAccountDetails = {
  __typename?: 'IndividualDraftAccountDetails';
  employer?: Maybe<Employer>;
  employmentStatus?: Maybe<EmploymentStatusType>;
  netIncome?: Maybe<NetRange>;
  netWorth?: Maybe<NetRange>;
};

export type IndustryInput = {
  industry: Scalars['String'];
};

export type LegalNameInput = {
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** [MOCK] Complete corporate draft account */
  completeCorporateDraftAccount?: Maybe<CorporateDraftAccount>;
  /** Complete individual draft account */
  completeIndividualDraftAccount?: Maybe<IndividualDraftAccount>;
  /**
   * Profile onboarding mutation.
   * Every field in the input can be requested separately.
   * In case of any failure all changes in the request are not stored in the database.
   * To finish onboarding send field 'verifyAndFinish'
   */
  completeProfileDetails?: Maybe<Profile>;
  /** [MOCK] Complete trust draft account */
  completeTrustDraftAccount?: Maybe<TrustDraftAccount>;
  /**
   * Create file links for avatar.
   * In the response, it returns the "id" and "url".
   * Use "url" for PUT request to upload the avatar directly to AWS S3. The url has expiration date!
   * Use "id" wherever system needs the reference to the avatar file.
   */
  createAvatarFileLink?: Maybe<PutFileLink>;
  /**
   * Create file links for documents.
   * In the response, it returns the "id" and "url".
   * Use "url" for PUT request to upload the file directly to AWS S3. The url has expiration date!
   * Use "id" wherever system needs the reference to uploaded file.
   */
  createDocumentsFileLinks?: Maybe<Array<Maybe<PutFileLink>>>;
  /**
   * Create draft of an account to fulfill with data before open it.
   * You can have only one draft account created of a specific type in the same time.
   */
  createDraftAccount?: Maybe<DraftAccount>;
  /**
   * Open REINVEST Account based on draft.
   * Currently supported: Individual Account
   */
  openAccount?: Maybe<Scalars['Boolean']>;
  /** Remove draft account */
  removeDraftAccount?: Maybe<Scalars['Boolean']>;
  /** Add phone number. The system will send the verification code to the provided phone number via sms. */
  setPhoneNumber?: Maybe<Scalars['Boolean']>;
  /** [WIP] */
  signDocumentFromTemplate?: Maybe<SignatureId>;
  /**
   * Verify phone number with received verification code on sms.
   * This action will set the phone number in the user Cognito profile and allow to use 2FA with phone number
   */
  verifyPhoneNumber?: Maybe<Scalars['Boolean']>;
};

export type MutationCompleteCorporateDraftAccountArgs = {
  accountId?: InputMaybe<Scalars['ID']>;
  input?: InputMaybe<CorporateDraftAccountInput>;
};

export type MutationCompleteIndividualDraftAccountArgs = {
  accountId?: InputMaybe<Scalars['ID']>;
  input?: InputMaybe<IndividualAccountInput>;
};

export type MutationCompleteProfileDetailsArgs = {
  input?: InputMaybe<ProfileDetailsInput>;
};

export type MutationCompleteTrustDraftAccountArgs = {
  accountId?: InputMaybe<Scalars['ID']>;
  input?: InputMaybe<TrustDraftAccountInput>;
};

export type MutationCreateDocumentsFileLinksArgs = {
  numberOfLinks: Scalars['numberOfLinks_Int_NotNull_min_1_max_10'];
};

export type MutationCreateDraftAccountArgs = {
  type?: InputMaybe<DraftAccountType>;
};

export type MutationOpenAccountArgs = {
  draftAccountId?: InputMaybe<Scalars['String']>;
};

export type MutationRemoveDraftAccountArgs = {
  draftAccountId?: InputMaybe<Scalars['ID']>;
};

export type MutationSetPhoneNumberArgs = {
  countryCode?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type MutationSignDocumentFromTemplateArgs = {
  fields: Array<InputMaybe<GenericFieldInput>>;
  signature: Scalars['String'];
  templateId: TemplateName;
};

export type MutationVerifyPhoneNumberArgs = {
  authCode?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type NetRange = {
  __typename?: 'NetRange';
  range?: Maybe<Scalars['String']>;
};

export type NetRangeInput = {
  range: Scalars['String'];
};

export type NumberOfEmployeesInput = {
  numberOfEmployees: Scalars['String'];
};

export type PersonName = {
  firstName: Scalars['firstName_String_NotNull_minLength_1'];
  lastName: Scalars['lastName_String_NotNull_minLength_1'];
  middleName?: InputMaybe<Scalars['String']>;
};

export type PoliticianStatementInput = {
  description: Scalars['String'];
};

/**
 * An investor profile information.
 * Returns data about investor details, accounts and notifications
 */
export type Profile = {
  __typename?: 'Profile';
  accounts?: Maybe<Array<Maybe<AccountOverview>>>;
  details?: Maybe<ProfileDetails>;
  /** The external, nice-looking profile ID */
  externalId?: Maybe<Scalars['String']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  /** The name/label of the user */
  label?: Maybe<Scalars['String']>;
};

export type ProfileDetails = {
  __typename?: 'ProfileDetails';
  address?: Maybe<Address>;
  dateOfBirth?: Maybe<Scalars['String']>;
  domicile?: Maybe<Domicile>;
  experience?: Maybe<Experience>;
  firstName?: Maybe<Scalars['String']>;
  idScan?: Maybe<Array<Maybe<FileLinkId>>>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  ssn?: Maybe<Scalars['String']>;
  statements?: Maybe<Array<Maybe<Statement>>>;
};

export type ProfileDetailsInput = {
  /** Permanent address of an investor */
  address?: InputMaybe<AddressInput>;
  /** Date of Birth in format YYYY-MM-DD */
  dateOfBirth?: InputMaybe<Scalars['ISODate']>;
  /** Is the investor US. Citizen or US. Resident with Green Card or Visa */
  domicile?: InputMaybe<DomicileInput>;
  /**
   * ID scan can be provided in more then one document, ie. 2 scans of both sides of the ID.
   * Required "id" provided in the @FileLink type from the @createDocumentsFileLinks mutation
   */
  idScan?: InputMaybe<Array<InputMaybe<FileLinkInput>>>;
  investingExperience?: InputMaybe<ExperienceInput>;
  /** An investor name */
  name?: InputMaybe<PersonName>;
  /** If an investor decided to remove one of the statements during onboarding */
  removeStatements?: InputMaybe<Array<InputMaybe<StatementInput>>>;
  /** A valid SSN number */
  ssn?: InputMaybe<SsnInput>;
  /** FINRA, Politician, Trading company stakeholder, accredited investor statements */
  statements?: InputMaybe<Array<InputMaybe<StatementInput>>>;
  /** Send this field if you want to finish the onboarding. In case of success verification, onboarding will be considered as completed */
  verifyAndFinish?: InputMaybe<Scalars['Boolean']>;
};

/** Link id + PUT url to store resource in the storage */
export type PutFileLink = {
  __typename?: 'PutFileLink';
  id?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * Return all accounts overview
   * [PARTIAL_MOCK] Position total is still mocked!!
   */
  getAccountsOverview?: Maybe<Array<Maybe<AccountOverview>>>;
  /** [MOCK] */
  getCorporateDraftAccount?: Maybe<CorporateDraftAccount>;
  /**
   * Returns individual account information
   * [PARTIAL_MOCK] Position total is still mocked!!
   */
  getIndividualAccount?: Maybe<IndividualAccount>;
  /** Get details of individual draft account */
  getIndividualDraftAccount?: Maybe<IndividualDraftAccount>;
  /** Get user profile */
  getProfile?: Maybe<Profile>;
  /** [WIP] */
  getTemplate?: Maybe<Template>;
  /** [MOCK] */
  getTrustDraftAccount?: Maybe<TrustDraftAccount>;
  /**  Just say hello  */
  hello?: Maybe<Scalars['Boolean']>;
  /** List all existing draft accounts if you need come back to onboarding */
  listAccountDrafts?: Maybe<Array<Maybe<DraftAccount>>>;
  /** Returns list of account types that user can open */
  listAccountTypesUserCanOpen?: Maybe<Array<Maybe<AccountType>>>;
  /** [MOCK] Returns information if user already assigned and verified phone number */
  phoneCompleted?: Maybe<Scalars['Boolean']>;
  /** Returns invitation link with a valid referral code (incentive token) */
  userInvitationLink?: Maybe<UserInvitationLink>;
};

export type QueryGetCorporateDraftAccountArgs = {
  accountId?: InputMaybe<Scalars['ID']>;
};

export type QueryGetIndividualAccountArgs = {
  accountId?: InputMaybe<Scalars['String']>;
};

export type QueryGetIndividualDraftAccountArgs = {
  accountId?: InputMaybe<Scalars['ID']>;
};

export type QueryGetTemplateArgs = {
  templateName?: InputMaybe<TemplateName>;
};

export type QueryGetTrustDraftAccountArgs = {
  accountId?: InputMaybe<Scalars['ID']>;
};

export type SsnInput = {
  /** The valid SSN is 9 digits in format 'XXX-XX-XXXX' */
  ssn: Scalars['ssn_String_NotNull_pattern_093092094'];
};

export type SignatureId = {
  __typename?: 'SignatureId';
  signatureId?: Maybe<Scalars['String']>;
};

export type Stakeholder = {
  __typename?: 'Stakeholder';
  address?: Maybe<Address>;
  dateOfBirth?: Maybe<Scalars['ISODate']>;
  domicile?: Maybe<Domicile>;
  email?: Maybe<Scalars['EmailAddress']>;
  idScan?: Maybe<Array<Maybe<FileLinkId>>>;
  legalName?: Maybe<Scalars['String']>;
  ssn?: Maybe<Scalars['String']>;
};

export type StakeholderInput = {
  address: AddressInput;
  dateOfBirth: Scalars['ISODate'];
  domicile: DomicileInput;
  idScan: Array<InputMaybe<FileLinkInput>>;
  legalName: LegalNameInput;
  ssn: SsnInput;
  email?: InputMaybe<EmailInput>;
};

export type Statement = {
  __typename?: 'Statement';
  details?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<StatementType>;
};

/**
 * An investor statements for:
 * - being a FINRA member
 * - politician
 * - public trading company stakeholder
 * Choose type and add details depending on the chosen type
 */
export type StatementInput = {
  type: StatementType;
  forAccreditedInvestor?: InputMaybe<AccreditedInvestorInput>;
  forFINRA?: InputMaybe<FinraStatementInput>;
  forPolitician?: InputMaybe<PoliticianStatementInput>;
  forStakeholder?: InputMaybe<TradingCompanyStakeholderInput>;
};

export enum StatementType {
  AccreditedInvestor = 'AccreditedInvestor',
  FinraMember = 'FINRAMember',
  Politician = 'Politician',
  TradingCompanyStakeholder = 'TradingCompanyStakeholder',
}

export type Template = {
  __typename?: 'Template';
  content?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Scalars['String']>>>;
  templateName?: Maybe<TemplateName>;
};

export enum TemplateName {
  AutoReinvestmentAgreement = 'AUTO_REINVESTMENT_AGREEMENT',
  SubscriptionAgreement = 'SUBSCRIPTION_AGREEMENT',
}

export type TradingCompanyStakeholderInput = {
  tickerSymbols: Array<Scalars['String']>;
};

export enum TrustCompanyType {
  Irrevocable = 'IRREVOCABLE',
  Revocable = 'REVOCABLE',
}

export type TrustCompanyTypeInput = {
  type?: InputMaybe<TrustCompanyType>;
};

/** [MOCK] */
export type TrustDraftAccount = {
  __typename?: 'TrustDraftAccount';
  address?: Maybe<Address>;
  annualRevenue?: Maybe<Scalars['String']>;
  avatar?: Maybe<GetAvatarLink>;
  companyDocuments?: Maybe<Array<Maybe<FileLinkId>>>;
  companyType?: Maybe<TrustCompanyType>;
  ein?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  industry?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  numberOfEmployees?: Maybe<Scalars['String']>;
  stakeholders?: Maybe<Array<Maybe<Stakeholder>>>;
};

export type TrustDraftAccountInput = {
  address?: InputMaybe<AddressInput>;
  annualRevenue?: InputMaybe<AnnualRevenueInput>;
  avatar?: InputMaybe<FileLinkInput>;
  companyDocuments?: InputMaybe<Array<InputMaybe<FileLinkInput>>>;
  companyType?: InputMaybe<TrustCompanyTypeInput>;
  ein?: InputMaybe<EinInput>;
  industry?: InputMaybe<IndustryInput>;
  name?: InputMaybe<CompanyNameInput>;
  numberOfEmployees?: InputMaybe<NumberOfEmployeesInput>;
  removeDocuments?: InputMaybe<Array<InputMaybe<FileLinkInput>>>;
  removeStakeholders?: InputMaybe<Array<InputMaybe<SsnInput>>>;
  stakeholders?: InputMaybe<Array<InputMaybe<StakeholderInput>>>;
};

/** User invitation/referral/incentive token link to share with others */
export type UserInvitationLink = {
  __typename?: 'UserInvitationLink';
  url?: Maybe<Scalars['String']>;
};

export type VisaInput = {
  birthCountry: Scalars['String'];
  citizenshipCountry: Scalars['String'];
  visaType: Scalars['String'];
};
