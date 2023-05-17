export enum DividendAction {
  WITHDRAW_FUNDS = 'WITHDRAW_FUNDS',
  REINVEST_FUNDS = 'REINVEST_FUNDS',
}

export interface FlowFields {
  _amount?: number;
  _amountMasked?: string;
  _dividendId?: string;

  action?: DividendAction;
}
