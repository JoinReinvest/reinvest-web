import { PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { IdentificationDocuments } from 'views/onboarding/form-flow/form-fields';

import { sendFilesToS3Bucket, UploadFile } from './sendFilesToS3Bucket';

export const getIdScans = async (documentsFileLinks: PutFileLink[], identificationDocument: IdentificationDocuments) => {
  const s3urls = documentsFileLinks.filter(documentFileLink => documentFileLink.url) as string[];

  const images: UploadFile[] = [
    {
      file: identificationDocument.front,
      url: s3urls[0] || '',
    },
    {
      file: identificationDocument.back,
      url: s3urls[1] || '',
    },
  ];

  await sendFilesToS3Bucket(images);

  return documentsFileLinks?.map(documentFileLink => ({ id: documentFileLink?.id })) as { id: string }[];
};
