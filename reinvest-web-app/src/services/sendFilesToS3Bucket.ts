import { fetcher } from './fetcher';

export interface UploadFile {
  file: File | null;
  url: string;
}

export const sendFilesToS3Bucket = async (uploadFiles: UploadFile[]) => {
  const promises = uploadFiles.map(
    ({ file, url }) =>
      new Promise((resolve, reject) => {
        try {
          const repsonse = fetcher(url, 'PUT', file);
          resolve(repsonse);
        } catch (error) {
          reject(error);
        }
      }),
  );

  return Promise.all(promises);
};
