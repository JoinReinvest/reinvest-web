import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DocumentFileLinkInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { sendDocumentsToS3AndGetScanIds } from 'services/getIdScans';

export const useSendDocumentsToS3AndGetScanIds = (): UseMutationResult<
  DocumentFileLinkInput[],
  Error,
  { documentsFileLinks: PutFileLink[]; identificationDocuments: DocumentFile[] }
> =>
  useMutation({
    mutationFn: async ({ documentsFileLinks, identificationDocuments }) => {
      return sendDocumentsToS3AndGetScanIds(documentsFileLinks, identificationDocuments);
    },
  });
