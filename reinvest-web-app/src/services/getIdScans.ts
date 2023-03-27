import { PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { IdentificationDocuments } from 'views/onboarding/form-flow/form-fields';

import { sendImagesToS3Bucket, UploadImage } from './sendImagesToS3Bucket';

export const getIdScans = async (documentsFileLinks: PutFileLink[], identificationDocument: IdentificationDocuments) => {
  const s3urls = documentsFileLinks?.map(documentFileLink => documentFileLink?.url);
  const images: UploadImage[] = [
    {
      image: identificationDocument.front,
      url: s3urls[0] || '',
    },
    {
      image: identificationDocument.back,
      url: s3urls[1] || '',
    },
  ];

  await sendImagesToS3Bucket(images);

  const documentIds = documentsFileLinks?.map(documentFileLink => ({ id: documentFileLink?.id })) as { id: string }[];

  return documentIds;
};
