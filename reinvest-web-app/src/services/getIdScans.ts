import { PutFileLink } from 'reinvest-app-common/src/types/graphql';

import { sendFilesToS3Bucket, UploadFile } from './sendFilesToS3Bucket';

export const sendDocumentsToS3AndGetScanIds = async (documentsFileLinks: PutFileLink[], identificationDocuments: File[]): Promise<{ id: string }[]> => {
  const images = documentsFileLinks
    .filter(documentFileLink => documentFileLink.url)
    .map(({ url, id }, index) => {
      const file = identificationDocuments.at(index);

      return { url, id, file };
    }) as UploadFile[];

  await sendFilesToS3Bucket(images);

  return images.map(({ id, file }) => ({ id, fileName: file.name }));
};
