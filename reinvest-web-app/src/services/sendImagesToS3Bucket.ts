import { fetcher } from './fetcher';

export interface UploadImage {
  image: File | null;
  url: string;
}

export const sendImagesToS3Bucket = async (uploadImages: UploadImage[]) => {
  const promises = uploadImages.map(
    ({ image, url }) =>
      new Promise((resolve, reject) => {
        try {
          const repsonse = fetcher(url, 'PUT', image);
          resolve(repsonse);
        } catch (error) {
          reject(error);
        }
      }),
  );

  return Promise.all(promises);
};
