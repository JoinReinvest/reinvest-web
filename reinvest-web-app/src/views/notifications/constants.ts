import { Notification, NotificationObjectType, NotificationType } from 'reinvest-app-common/src/types/graphql';

import { FlowIdentifiers } from './flows/identifiers';

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: 'f1795a6c-34d8-4b6c-9be6-ff0bcfb94c47',
    notificationType: NotificationType.RewardDividendReceived,
    header: 'Referral Reward',
    date: '2023-05-15T13:37:45',
    body: 'You earned {{$10}} for inviting friends and family. Reinvest or withdraw your reward.',
    isRead: false,
    isDismissible: false,
    accountId: '11124318-b3c3-4fa5-9b3e-558c987de83d',
    onObject: {
      id: 'f38b8983-e2a8-43e9-bfe4-93e00255deca',
      type: NotificationObjectType.Dividend,
    },
  },
  {
    id: '2ffb89ce-7ab6-4e05-a20d-ef8cc7f3de8d',
    notificationType: NotificationType.DividendReceived,
    header: 'Dividend Update',
    date: '2023-04-25T13:37:45',
    body: 'You earned {{$10}} in dividends. Reinvest or withdraw your dividend.',
    isRead: false,
    isDismissible: false,
    accountId: '11124318-b3c3-4fa5-9b3e-558c987de83d',
    onObject: {
      id: '24ab65cf-40c4-44a3-9804-212a78c4da83',
      type: NotificationObjectType.Dividend,
    },
  },
  {
    id: '4943a48e-f2b1-4057-94a5-cef006393119',
    notificationType: NotificationType.GenericNotification,
    header: 'This is some notification',
    date: '2023-05-16T13:36:45',
    body: 'This is generic notification test. Just display it and no other action required.',
    isRead: false,
    isDismissible: true,
    accountId: '11124318-b3c3-4fa5-9b3e-558c987de83d',
    onObject: null,
  },
  {
    id: '98c9eb8f-4d51-486c-9e00-506c65a4b3c9',
    notificationType: NotificationType.VerificationFailed,
    header: 'Investment Failed',
    date: '2023-05-16T13:27:45',
    body: '{{The verification of your account failed.}} Please update your data to carry on investing.',
    isRead: false,
    isDismissible: true,
    accountId: '11124318-b3c3-4fa5-9b3e-558c987de83d',
    onObject: null,
  },
  {
    id: 'cff0acd7-2a1e-45d3-940e-12cce317d553',
    notificationType: NotificationType.RecurringInvestmentFailed,
    header: 'Your Recurring investment failed',
    date: '2023-05-16T11:34:45',
    body: 'Lorem ipsum, but go and see if you can unsuspend it :)',
    isRead: false,
    isDismissible: true,
    accountId: '11124318-b3c3-4fa5-9b3e-558c987de83d',
    onObject: null,
  },
  {
    id: '98c9eb8f-4d51-486c-9e00-506c65a4b3c9',
    notificationType: NotificationType.InvestmentFailed,
    header: 'Investment Failed',
    date: '2023-05-09T14:57:45',
    body: "Your recent investment {{3009334}} failed. We'll try to process payment again over the next few days. To process investment., you may need to update your billing details",
    isRead: false,
    isDismissible: true,
    accountId: '11124318-b3c3-4fa5-9b3e-558c987de83d',
    onObject: {
      id: '7c0d0826-d0fb-41e7-b23f-f89c44748e15',
      type: NotificationObjectType.Investment,
    },
  },
];

export const NOTIFICATION_TYPE_FLOWS = new Map<NotificationType, FlowIdentifiers>([[NotificationType.DividendReceived, FlowIdentifiers.MANAGE_DIVIDENDS]]);
