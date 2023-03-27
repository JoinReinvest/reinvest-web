import { PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { IdentificationDocuments } from 'views/onboarding/form-flow/form-fields';

import { sendFilesToS3Bucket, UploadFile } from './sendFilesToS3Bucket';

export const sendDocumentsToS3AndGetScanIds = async (
  documentsFileLinks: PutFileLink[],
  identificationDocument: IdentificationDocuments,
): Promise<{ id: string }[]> => {
  const images = documentsFileLinks
    .filter(documentFileLink => documentFileLink.url)
    .map(({ url, id }, index) => ({
      url,
      id,
      file: index === 0 ? identificationDocument.front : identificationDocument.back,
    })) as UploadFile[];

  await sendFilesToS3Bucket(images);

  return images.map(({ id }) => ({ id }));
};
