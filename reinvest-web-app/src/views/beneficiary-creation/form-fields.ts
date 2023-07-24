import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { BeneficiaryAccount } from 'reinvest-app-common/src/types/graphql';

export interface BeneficiaryCreationFormFields {
  beneficiary?: BeneficiaryAccount | null;
  firstName?: string;
  lastName?: string;
  profilePicture?: DocumentFile;
}
