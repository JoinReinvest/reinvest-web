import { makeRequest } from 'services/api-request';

export interface UploadFile {
  file: File;
  id: string;
  url: string;
}

export const sendFilesToS3Bucket = async (uploadFiles: UploadFile[]) => {
  const promises = uploadFiles.map(
    ({ file, url }) =>
      new Promise((resolve, reject) => {
        try {
          const response = makeRequest({ url, method: 'PUT', data: file });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
  );

  return Promise.all(promises);
};
