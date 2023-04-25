import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DocumentFileLinkInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';

import { sendFilesToS3Bucket, UploadFile } from './sendFilesToS3Bucket';

export const sendDocumentsToS3AndGetScanIds = async (
  documentsFileLinks: PutFileLink[],
  identificationDocuments: DocumentFile[],
): Promise<DocumentFileLinkInput[]> => {
  const files = documentsFileLinks
    .filter(documentFileLink => documentFileLink.url)
    .map(({ url, id }, index) => {
      const file = identificationDocuments.at(index);

      return { url, id, file: file?.file || file, fileName: file?.fileName || file?.file?.name };
    }) as UploadFile[];

  await sendFilesToS3Bucket(files);

  return files.map(({ id, file, fileName }) => ({ id, fileName: file.name || fileName }));
};
