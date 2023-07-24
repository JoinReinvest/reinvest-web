export interface FlowFields {
  willOptIn?: boolean;
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  OPT_IN = 'OPT_IN',
  CONFIRMATION = 'CONFIRMATION',
}
