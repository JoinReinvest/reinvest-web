import { DocumentFile } from 'reinvest-app-common/src/types/document-file';

export interface FlowFields {
  _hasSucceded?: boolean;
  identificationDocuments?: DocumentFile[];
  name?: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
}
