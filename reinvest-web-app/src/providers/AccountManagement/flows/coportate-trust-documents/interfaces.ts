import { DocumentFile } from 'reinvest-app-common/src/types/document-file';

export interface FlowFields {
  _accountId?: string;
  _isCorporateAccount?: boolean;
  documents?: DocumentFile[];
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  DOCUMENTS = 'DOCUMENTS',
}

export interface FormFields {
  documents: DocumentFile[];
}
