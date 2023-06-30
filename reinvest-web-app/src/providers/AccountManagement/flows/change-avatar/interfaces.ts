import { DocumentFile } from 'reinvest-app-common/src/types/document-file';

export interface FlowFields {
  profilePicture: DocumentFile | null;
  _hasSucceded?: boolean;
}
