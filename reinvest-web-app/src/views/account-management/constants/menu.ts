import { FlowIdentifiers } from '../enums/flow';
import { MenuGroupIdentifiers } from '../enums/menu';
import { MenuGroup } from '../interfaces/menu';

const SECTION_INVESTING_ITEMS = [
  { identifier: FlowIdentifiers.INVESTMENT_HISTORY, label: 'Investment History' },
  { identifier: FlowIdentifiers.RECURRING_INVESTMENTS, label: 'Recurring Investments' },
  { identifier: FlowIdentifiers.DIVIDEND_REINVESTING, label: 'Dividend Reinvesting' },
  { identifier: FlowIdentifiers.WITHDRAW_FUNDS, label: 'Withdraw Funds' },
  { identifier: FlowIdentifiers.BANK_ACCOUNT, label: 'Bank Account' },
  { identifier: FlowIdentifiers.ACCOUNT_ACTIVITY, label: 'Account Activity' },
];

export const SECTION_INVESTING: MenuGroup = {
  identifier: MenuGroupIdentifiers.INVESTING,
  label: 'Investing',
  items: SECTION_INVESTING_ITEMS,
};

export const SECTION_BENEFICIARY_INVESTING: MenuGroup = {
  identifier: MenuGroupIdentifiers.INVESTING,
  label: 'Investing',
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

export const SECTION_PROFILE: MenuGroup = {
  identifier: MenuGroupIdentifiers.PROFILE_INFORMATION,
  label: 'Profile Information',
  items: [
    { identifier: FlowIdentifiers.NAME, label: 'Name' },
    { identifier: FlowIdentifiers.UPDATE_PROFILE_PICTURE, label: 'Profile Picture' },
    { identifier: FlowIdentifiers.UPDATE_ADDRESS, label: 'Address' },
  ],
};

export const MENU_GROUPS = {
  investing: SECTION_INVESTING,
  investingBeneficiary: SECTION_BENEFICIARY_INVESTING,
  security: SECTION_SECURITY,
  profile: SECTION_PROFILE,
};
