export interface FlowFields {
  netIncome?: string;
  netWorth?: string;
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  CURRENT = 'CURRENT',
  DETAILS = 'DETAILS',
  CONFIRMATION = 'CONFIRMATION',
}
