import { PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { IdentificationDocuments } from 'views/onboarding/form-flow/form-fields';

import { sendFilesToS3Bucket, UploadFile } from './sendFilesToS3Bucket';

export const getIdScans = async (documentsFileLinks: PutFileLink[], identificationDocument: IdentificationDocuments) => {
  const images = documentsFileLinks
    .filter(documentFileLink => documentFileLink.url)
    .map(({ url }, index) => {
      return index === 0 ? { file: identificationDocument.front, url } : { file: identificationDocument.back, url };
    }) as UploadFile[];

  await sendFilesToS3Bucket(images);

  return documentsFileLinks?.map(documentFileLink => ({ id: documentFileLink?.id })) as { id: string }[];
};
