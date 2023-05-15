import dayjs from 'dayjs';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { Notification } from './interfaces';

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Referral Reward Update',
    description: '{{$10}} in referral reward credit has been transferred to your bank account. Please expect to see it deposited within 3–5 business days.',
    date: formatDate(dayjs().subtract(1, 'day').toDate(), 'API'),
    hasBeenRead: false,
  },
  {
    id: '2',
    title: 'Dividend Update',
    description: 'You earned {{$10}} in dividends. Reinvest or withdraw your dividend. ',
    date: formatDate('05/12/2023', 'API', { currentFormat: 'DEFAULT' }),
    hasBeenRead: true,
    isActionable: true,
  },
  {
    id: '3',
    title: 'Investment failed',
    description:
      'Your recent investment {{148ED-2F}} failed. We’ll try to process payment again over the next few days. To process investment, you may need to update your billing details.',
    date: formatDate('01/30/2023', 'API', { currentFormat: 'DEFAULT' }),
    hasBeenRead: false,
    isActionable: true,
  },
  {
    id: '4',
    title: 'Dividends Payout',
    description: 'Congrats! You have received a {{$30}} dividend payout in your bank account. Funds should appear within 3–5 business days.',
    date: formatDate('12/20/2022', 'API', { currentFormat: 'DEFAULT' }),
    hasBeenRead: false,
  },
];
