import { DividendAction } from '../interfaces';

export interface FlowFields {
  _amount?: number;
  _amountMasked?: string;
  _dividendId?: string;

  action?: DividendAction;
}
