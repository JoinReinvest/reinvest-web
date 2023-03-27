import { SelectOptions } from 'reinvest-app-common/src/types/select-option';

export const NET_WORTHS = [
  '$25,000 - $50,000',
  '$50,000 - $75,000',
  '$75,000 - $100,000',
  '$100,000 - $125,000',
  '$125,000 - $150,000',
  '$150,000 - $175,000',
  '$175,000 - $200,000',
  '$200,000 - $250,000',
  '$250,000 - $300,000',
  '$300,000 - $400,000',
  '$400,000 - $500,000',
  '$500,000 +',
];

export const NET_WORTHS_AS_OPTIONS: SelectOptions = NET_WORTHS.map(worth => {
  const value = worth.split(' ').join('');

  return { label: worth, value };
});
