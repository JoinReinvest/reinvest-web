export interface FlowFields {
  _willUpdateBankAccount?: boolean;
  hashedBankAccount?: string;
}

export enum FlowStepIdentifiers {
  CURRENT_BANK_ACCOUNT = 'CURRENT_BANK_ACCOUNT',
  DISCLAIMER = 'DISCLAIMER',
  BANK_ACCOUNT_SELECTION = 'BANK_ACCOUNT_SELECTION',
  CONFIRMATION = 'CONFIRMATION',
}
