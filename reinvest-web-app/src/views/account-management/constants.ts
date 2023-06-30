import { FlowIdentifiers } from 'providers/AccountManagement/enums';

import { MenuGroupIdentifiers } from './enums';
import { MenuGroup } from './interfaces';

const INVESTING_LABEL = 'Investing';
const PROFILE_LABEL = 'Profile Information';

const SECTION_INVESTING_ITEMS = [
  { identifier: FlowIdentifiers.INVESTMENT_HISTORY, label: 'Investment History' },
  { identifier: FlowIdentifiers.RECURRING_INVESTMENTS, label: 'Recurring Investments' },
  { identifier: FlowIdentifiers.DIVIDEND_REINVESTING, label: 'Dividend Reinvesting' },
  { identifier: FlowIdentifiers.WITHDRAW_FUNDS, label: 'Withdraw Funds' },
  { identifier: FlowIdentifiers.BANK_ACCOUNT, label: 'Bank Account' },
  { identifier: FlowIdentifiers.ACCOUNT_ACTIVITY, label: 'Account Activity' },
];

const PROFILE_ITEMS = [
  { identifier: FlowIdentifiers.NAME, label: 'Name' },
  { identifier: FlowIdentifiers.UPDATE_ADDRESS, label: 'Personal Address' },
  { identifier: FlowIdentifiers.DOMICILE, label: 'Domicile' },
  { identifier: FlowIdentifiers.EXPERIENCE, label: 'Investor Experience Level' },
  { identifier: FlowIdentifiers.COMPLIANCE, label: 'Compliance Questions' },
];

const INDIVIDUAL_PROFILE_ITEMS = [
  { identifier: FlowIdentifiers.UPDATE_PROFILE_PICTURE, label: 'Profile Picture' },
  { identifier: FlowIdentifiers.EMPLOYMENT_DETAILS, label: 'Employment Details' },
  { identifier: FlowIdentifiers.INCOME_AND_WORTH, label: 'Net Income And Worths' },
];

const COMPANY_PROFILE_ITEMS = [
  { identifier: FlowIdentifiers.UPDATE_PROFILE_PICTURE, label: 'Profile Picture' },
  { identifier: FlowIdentifiers.BUSINESS_ADDRESS, label: 'Address' },
  { identifier: FlowIdentifiers.DOCUMENTS, label: 'Documents' },
];

const SECTION_INDIVIDUAL_PROFILE_ITEMS = [...PROFILE_ITEMS, ...INDIVIDUAL_PROFILE_ITEMS];

const SECTION_BENEFICIARY_PROFILE_ITEMS = [
  { identifier: FlowIdentifiers.BENEFICIARY_NAME, label: 'Name' },
  { identifier: FlowIdentifiers.UPDATE_PROFILE_PICTURE, label: 'Profile Picture' },
];

const SECTION_COMPANY_PROFILE_ITEMS = [...PROFILE_ITEMS, ...COMPANY_PROFILE_ITEMS];

export const SECTION_INVESTING: MenuGroup = {
  identifier: MenuGroupIdentifiers.INVESTING,
  label: INVESTING_LABEL,
  items: SECTION_INVESTING_ITEMS,
};

export const SECTION_BENEFICIARY_INVESTING: MenuGroup = {
  identifier: MenuGroupIdentifiers.INVESTING,
  label: INVESTING_LABEL,
  items: [
    ...SECTION_INVESTING_ITEMS,
    {
      identifier: FlowIdentifiers.REMOVE_ACCOUNT,
      label: 'Remove Account',
    },
  ],
};

export const SECTION_SECURITY: MenuGroup = {
  identifier: MenuGroupIdentifiers.SIGN_IN_AND_SECURITY,
  label: 'Sign in & Security',
  items: [
    { identifier: FlowIdentifiers.EMAIL_ADDRESS, label: 'Email Address' },
    { identifier: FlowIdentifiers.PHONE_NUMBER, label: 'Phone Number' },
    { identifier: FlowIdentifiers.CHANGE_PASSWORD, label: 'Change Password' },
  ],
};

export const SECTION_INDIVIDUAL_PROFILE: MenuGroup = {
  identifier: MenuGroupIdentifiers.PROFILE_INFORMATION,
  label: PROFILE_LABEL,
  items: SECTION_INDIVIDUAL_PROFILE_ITEMS,
};

export const SECTION_BENEFICIARY_PROFILE: MenuGroup = {
  identifier: MenuGroupIdentifiers.PROFILE_INFORMATION,
  label: PROFILE_LABEL,
  items: SECTION_BENEFICIARY_PROFILE_ITEMS,
};

export const SECTION_COMPANY_PROFILE: MenuGroup = {
  identifier: MenuGroupIdentifiers.PROFILE_INFORMATION,
  label: PROFILE_LABEL,
  items: SECTION_COMPANY_PROFILE_ITEMS,
};

export const MENU_GROUPS = {
  investing: SECTION_INVESTING,
  investingBeneficiary: SECTION_BENEFICIARY_INVESTING,
  security: SECTION_SECURITY,
  beneficiaryProfile: SECTION_BENEFICIARY_PROFILE,
  individualProfile: SECTION_INDIVIDUAL_PROFILE,
  companyProfile: SECTION_COMPANY_PROFILE,
};
