import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { sendDocumentsToS3AndGetScanIds } from 'services/getIdScans';

export const useSendDocumentsToS3AndGetScanIds = (): UseMutationResult<
  { id: string }[],
  Error,
  { documentsFileLinks: PutFileLink[]; identificationDocuments: File[] }
> =>
  useMutation({
    mutationFn: async ({ documentsFileLinks, identificationDocuments }) => {
      return sendDocumentsToS3AndGetScanIds(documentsFileLinks, identificationDocuments);
    },
  });
