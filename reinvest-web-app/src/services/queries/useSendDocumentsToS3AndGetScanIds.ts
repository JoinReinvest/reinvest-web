import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { sendDocumentsToS3AndGetScanIds } from 'services/getIdScans';

export interface IdScan {
  fileName: string;
  id: string;
}

export const useSendDocumentsToS3AndGetScanIds = (): UseMutationResult<
  IdScan[],
  Error,
  { documentsFileLinks: PutFileLink[]; identificationDocuments: File[] }
> =>
  useMutation({
    mutationFn: async ({ documentsFileLinks, identificationDocuments }) => {
      return sendDocumentsToS3AndGetScanIds(documentsFileLinks, identificationDocuments);
    },
  });
