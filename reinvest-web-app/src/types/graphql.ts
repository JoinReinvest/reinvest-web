// TO-DO: Deprecate the need of disable the eslint rule
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
  inCents_Int_NotNull_min_0: any;
  numberOfLinks_Int_NotNull_min_1_max_10: any;
};

export type Account = {
  __typename?: 'Account';
  avatarUrl?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  positionTotal?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AccountOverview = {
  __typename?: 'AccountOverview';
  avatarUrl?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  positionTotal?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export enum AccountType {
  Corporate = 'CORPORATE',
  Individual = 'INDIVIDUAL',
  Trust = 'TRUST',
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

export type CorporateDraftAccount = {
  __typename?: 'CorporateDraftAccount';
  id?: Maybe<Scalars['ID']>;
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

export enum Domicile {
  Citizen = 'CITIZEN',
  Resident = 'RESIDENT',
}

export type DraftAccount = {
  __typename?: 'DraftAccount';
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<AccountType>;
};

export type Employer = {
  __typename?: 'Employer';
  industry?: Maybe<Scalars['String']>;
  nameOfEmployer?: Maybe<Scalars['String']>;
  occupation?: Maybe<Scalars['String']>;
};

export type EmployerInput = {
  industry?: InputMaybe<Scalars['String']>;
  nameOfEmployer?: InputMaybe<Scalars['String']>;
  occupation?: InputMaybe<Scalars['String']>;
};

export enum EmploymentStatus {
  Employed = 'EMPLOYED',
  Retired = 'RETIRED',
  Student = 'STUDENT',
  Unemployed = 'UNEMPLOYED',
}

export enum Experience {
  Expert = 'EXPERT',
  NoExperience = 'NO_EXPERIENCE',
  SomeExperience = 'SOME_EXPERIENCE',
  VeryExperienced = 'VERY_EXPERIENCED',
}

export type FileLink = {
  __typename?: 'FileLink';
  id?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type FileLinkInput = {
  id: Scalars['String'];
};

export type GenericFieldInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Individual = {
  __typename?: 'Individual';
  address?: Maybe<Address>;
  dateOfBirth?: Maybe<Scalars['String']>;
  domicile?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
};

export type IndividualAccountInput = {
  employer?: InputMaybe<EmployerInput>;
  employmentStatus?: InputMaybe<EmploymentStatus>;
  experience?: InputMaybe<Experience>;
  netIncome?: InputMaybe<NetRangeInput>;
  netWorth?: InputMaybe<NetRangeInput>;
};

export type IndividualDraftAccount = {
  __typename?: 'IndividualDraftAccount';
  employer?: Maybe<Employer>;
  employmentStatus?: Maybe<EmploymentStatus>;
  experience?: Maybe<Experience>;
  id?: Maybe<Scalars['ID']>;
  netIncome?: Maybe<NetRange>;
  netWorth?: Maybe<NetRange>;
};

export type Mutation = {
  __typename?: 'Mutation';
  completeCorporateDraftAccount?: Maybe<CorporateDraftAccount>;
  completeIndividualDraftAccount?: Maybe<IndividualDraftAccount>;
  completeProfileDetails?: Maybe<Profile>;
  completeTrustDraftAccount?: Maybe<TrustDraftAccount>;
  createAvatarFileLink?: Maybe<FileLink>;
  createDocumentsFileLinks?: Maybe<Array<Maybe<FileLink>>>;
  createDraftAccount?: Maybe<DraftAccount>;
  openAccount?: Maybe<Scalars['Boolean']>;
  removeDraftAccount?: Maybe<Scalars['Boolean']>;
  setPhoneNumber?: Maybe<Scalars['Boolean']>;
  signDocumentFromTemplate?: Maybe<SignatureId>;
  verifyPhoneNumber?: Maybe<Scalars['Boolean']>;
};
export type MutationCompleteCorporateDraftAccountArgs = {
  accountId?: InputMaybe<Scalars['ID']>;
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
};
export type MutationCreateDocumentsFileLinksArgs = {
  numberOfLinks: Scalars['numberOfLinks_Int_NotNull_min_1_max_10'];
};
export type MutationCreateDraftAccountArgs = {
  type?: InputMaybe<AccountType>;
};
export type MutationOpenAccountArgs = {
  draftAccountId?: InputMaybe<Scalars['String']>;
};
export type MutationRemoveDraftAccountArgs = {
  id?: InputMaybe<Scalars['ID']>;
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
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};

export type NetRangeInput = {
  from: Scalars['String'];
  to: Scalars['String'];
};

export type PersonName = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: InputMaybe<Scalars['String']>;
};

/**
 * An investor profile information.
 * Returns data about investor details, accounts and notifications
 */
export type Profile = {
  __typename?: 'Profile';
  accounts?: Maybe<Array<Maybe<AccountOverview>>>;
  avatarUrl?: Maybe<Scalars['String']>;
  completionStatus?: Maybe<ProfileCompletionStatus>;
  details?: Maybe<Individual>;
  /** The external, nice-looking profile ID */
  externalId?: Maybe<Scalars['String']>;
  /** The name/label of the user */
  label?: Maybe<Scalars['String']>;
};

export type ProfileCompletionStatus = {
  __typename?: 'ProfileCompletionStatus';
  detailsCompleted?: Maybe<Scalars['Boolean']>;
  phoneCompleted?: Maybe<Scalars['Boolean']>;
};

export type ProfileDetailsInput = {
  address?: InputMaybe<AddressInput>;
  avatar?: InputMaybe<FileLinkInput>;
  /** Date of Birth in format YYYY-MM-DD */
  dateOfBirth?: InputMaybe<Scalars['ISODate']>;
  /** Is the investor US. Citizen or US. Resident */
  domicile?: InputMaybe<Domicile>;
  idScan?: InputMaybe<FileLinkInput>;
  name?: InputMaybe<PersonName>;
  /** A valid SSN number */
  ssn?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  canOpenAccount?: Maybe<Scalars['Boolean']>;
  getAccount?: Maybe<Account>;
  getCorporateDraftAccount?: Maybe<CorporateDraftAccount>;
  getIndividual?: Maybe<Individual>;
  getIndividualDraftAccount?: Maybe<IndividualDraftAccount>;
  getProfile?: Maybe<Profile>;
  getTemplate?: Maybe<Template>;
  getTrustDraftAccount?: Maybe<TrustDraftAccount>;
  hello?: Maybe<Scalars['Boolean']>;
  listAccountDrafts?: Maybe<Array<Maybe<DraftAccount>>>;
  profileCompletionStatus?: Maybe<ProfileCompletionStatus>;
};
export type QueryCanOpenAccountArgs = {
  accountType?: InputMaybe<AccountType>;
};
export type QueryGetAccountArgs = {
  accountId?: InputMaybe<Scalars['String']>;
};
export type QueryGetCorporateDraftAccountArgs = {
  accountId?: InputMaybe<Scalars['ID']>;
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

export type SignatureId = {
  __typename?: 'SignatureId';
  signatureId?: Maybe<Scalars['String']>;
};

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

export type TrustDraftAccount = {
  __typename?: 'TrustDraftAccount';
  id?: Maybe<Scalars['ID']>;
};
