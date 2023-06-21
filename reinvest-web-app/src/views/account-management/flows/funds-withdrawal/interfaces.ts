export interface FlowFields {
  _canWithdrawFunds?: boolean;
  agreesToSubscriptionAgreement?: boolean;
  reasonForRequest?: string;
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  PREVIEW = 'PREVIEW',
  REQUEST_FUNDS = 'REQUEST_FUNDS',
  REASON = 'REASON',
  SUBSCRIPTION_AGREEMENT = 'SUBSCRIPTION_AGREEMENT',
  CONFIRMATION = 'CONFIRMATION',
}
