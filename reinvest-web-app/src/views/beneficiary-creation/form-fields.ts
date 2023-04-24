import { DocumentFile } from 'reinvest-app-common/src/types/document-file';

export interface BeneficiaryCreationFormFields {
  firstName?: string;
  lastName?: string;
  profilePicture?: DocumentFile;
}
