export interface FlowFields {
  netIncome?: string;
  netWorth?: string;
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  DETAILS = 'DETAILS',
  CONFIRMATION = 'CONFIRMATION',
}
