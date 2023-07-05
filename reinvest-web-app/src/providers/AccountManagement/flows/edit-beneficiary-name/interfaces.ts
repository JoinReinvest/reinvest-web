export interface FlowFields {
  _hasSucceded?: boolean;
  name?: {
    firstName: string;
    lastName: string;
  };
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  CURRENT_NAME = 'CURRENT_NAME',
  FIELDS = 'FIELDS',
  CONFIRMATION = 'CONFIRMATION',
}
