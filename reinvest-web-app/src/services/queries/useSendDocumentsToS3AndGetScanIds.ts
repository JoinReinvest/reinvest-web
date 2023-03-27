import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { sendDocumentsToS3AndGetScanIds } from 'services/getIdScans';
import { IdentificationDocuments } from 'views/onboarding/form-flow/form-fields';

export const useSendDocumentsToS3AndGetScanIds = (): UseMutationResult<
  { id: string }[],
  Error,
  { documentsFileLinks: PutFileLink[]; identificationDocument: IdentificationDocuments }
> =>
  useMutation({
    mutationFn: async ({ documentsFileLinks, identificationDocument }) => {
      return sendDocumentsToS3AndGetScanIds(documentsFileLinks, identificationDocument);
    },
  });
