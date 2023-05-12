import { FlowIdentifiers } from '../enums/flow';
import { MenuGroupIdentifiers } from '../enums/menu';
import { MenuGroup } from '../interfaces/menu';

export const MENU_GROUP_INVESTING: MenuGroup = {
  identifier: MenuGroupIdentifiers.INVESTING,
  label: 'Investing',
  items: [
    { identifier: FlowIdentifiers.INVESTMENT_HISTORY, label: 'Investment History' },
    { identifier: FlowIdentifiers.RECURRING_INVESTMENTS, label: 'Recurring Investments' },
    { identifier: FlowIdentifiers.DIVIDEND_REINVESTING, label: 'Dividend Reinvesting' },
    { identifier: FlowIdentifiers.WITHDRAW_FUNDS, label: 'Withdraw Funds' },
    { identifier: FlowIdentifiers.BANK_ACCOUNT, label: 'Bank Account' },
    { identifier: FlowIdentifiers.ACCOUNT_ACTIVITY, label: 'Account Activity' },
  ],
};

export const MENU_GROUP_SECURITY: MenuGroup = {
  identifier: MenuGroupIdentifiers.SIGN_IN_AND_SECURITY,
  label: 'Sign in & Security',
  items: [
    { identifier: FlowIdentifiers.EMAIL_ADDRESS, label: 'Email Address' },
    { identifier: FlowIdentifiers.PHONE_NUMBER, label: 'Phone Number' },
    { identifier: FlowIdentifiers.CHANGE_PASSWORD, label: 'Change Password' },
  ],
};

export const MENU_GROUP_PROFILE: MenuGroup = {
  identifier: MenuGroupIdentifiers.PROFILE_INFORMATION,
  label: 'Profile Information',
  items: [
    { identifier: FlowIdentifiers.NAME, label: 'Name' },
    { identifier: FlowIdentifiers.ADDRESS, label: 'Address' },
  ],
};

export const MENU_GROUPS = [MENU_GROUP_INVESTING, MENU_GROUP_SECURITY, MENU_GROUP_PROFILE];
