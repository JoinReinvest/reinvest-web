import { MenuGroupIdentifiers, MenuItemIdentifiers } from '../enums/menu';
import { MenuGroup } from '../interfaces/menu';

export const MENU_GROUP_INVESTING: MenuGroup = {
  identifier: MenuGroupIdentifiers.INVESTING,
  label: 'Investing',
  items: [
    { identifier: MenuItemIdentifiers.INVESTMENT_HISTORY, label: 'Investment History' },
    { identifier: MenuItemIdentifiers.RECURRING_INVESTMENTS, label: 'Recurring Investments' },
    { identifier: MenuItemIdentifiers.DIVIDEND_REINVESTING, label: 'Dividend Reinvesting' },
    { identifier: MenuItemIdentifiers.WITHDRAW_FUNDS, label: 'Withdraw Funds' },
    { identifier: MenuItemIdentifiers.BANK_ACCOUNT, label: 'Bank Account' },
    { identifier: MenuItemIdentifiers.ACCOUNT_ACTIVITY, label: 'Account Activity' },
  ],
};

export const MENU_GROUP_SECURITY: MenuGroup = {
  identifier: MenuGroupIdentifiers.SIGN_IN_AND_SECURITY,
  label: 'Sign in & Security',
  items: [
    { identifier: MenuItemIdentifiers.EMAIL_ADDRESS, label: 'Email Address' },
    { identifier: MenuItemIdentifiers.PHONE_NUMBER, label: 'Phone Number' },
    { identifier: MenuItemIdentifiers.CHANGE_PASSWORD, label: 'Change Password' },
  ],
};

export const MENU_GROUP_PROFILE: MenuGroup = {
  identifier: MenuGroupIdentifiers.PROFILE_INFORMATION,
  label: 'Profile Information',
  items: [
    { identifier: MenuItemIdentifiers.NAME, label: 'Name' },
    { identifier: MenuItemIdentifiers.ADDRESS, label: 'Address' },
  ],
};

export const MENU_GROUPS = [MENU_GROUP_INVESTING, MENU_GROUP_SECURITY, MENU_GROUP_PROFILE];
