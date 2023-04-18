import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DocumentFileLinkInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';

import { sendFilesToS3Bucket, UploadFile } from './sendFilesToS3Bucket';

export const sendDocumentsToS3AndGetScanIds = async (
  documentsFileLinks: PutFileLink[],
  identificationDocuments: DocumentFile[],
): Promise<DocumentFileLinkInput[]> => {
  const images = documentsFileLinks
    .filter(documentFileLink => documentFileLink.url)
    .map(({ url, id }, index) => {
      const file = identificationDocuments.at(index);

      return { url, id, file: file?.file || file };
    }) as UploadFile[];

  await sendFilesToS3Bucket(images);

  return images.map(({ id, file }) => ({ id, fileName: file.name }));
};
