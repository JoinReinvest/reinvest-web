import { useCorporateAccount } from 'hooks/corporate-account';
import { useTrustAccount } from 'hooks/trust-account';
import { useState } from 'react';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DocumentFileLinkInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from 'services/queries/useSendDocumentsToS3AndGetScanIds';
import { MutationMeta } from 'types/queries';

import { FormFields } from '../interfaces';

interface Params {
  accountId: string;
  isCorporateAccount: boolean;
}

interface Returns {
  addDocumentToRemove: (document: DocumentFile) => void;
  uploadDocuments: (params: FormFields) => Promise<void>;
  uploadDocumentsMeta: Partial<MutationMeta>;
}

export function useHandleDocuments({ accountId, isCorporateAccount }: Params): Returns {
  const [documentsToRemove, setDocumentsToRemove] = useState<DocumentFileLinkInput[]>([]);
  const { updateCorporateAccount, updateCorporateAccountMeta } = useCorporateAccount({ accountId, enabled: isCorporateAccount });
  const { updateTrustAccount, updateTrustAccountMeta } = useTrustAccount({ accountId, enabled: !isCorporateAccount });

  const { mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
  const { mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();

  const uploadDocumentsMeta: Partial<MutationMeta> = {
    isLoading: updateCorporateAccountMeta.isLoading || updateTrustAccountMeta.isLoading,
    error: updateCorporateAccountMeta.error || updateTrustAccountMeta.error,
    isSuccess: updateCorporateAccountMeta.isSuccess || updateTrustAccountMeta.isSuccess,
  };

  function addDocumentToRemove(document: DocumentFile) {
    setDocumentsToRemove(documentsToRemove => [...documentsToRemove, document as DocumentFileLinkInput]);
  }

  async function uploadDocuments({ documents }: FormFields) {
    const removedDocumentIdentifiers = documentsToRemove.map(document => document?.id).filter(Boolean);
    const scannedDocuments: DocumentFileLinkInput[] = [];
    const hasDocuments = !!documents?.length;
    const alreadyUploadedDocuments = documents?.filter(document => !document.file);
    const documentsWithoutId = documents?.filter(document => !!document.file);
    const hasDocumentsWithoutId = !!documentsWithoutId?.length;

    if (hasDocuments && hasDocumentsWithoutId) {
      const numberOfDocumentsWithoutId = documentsWithoutId.length;
      const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: numberOfDocumentsWithoutId })) as PutFileLink[];
      const scans = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocuments: documentsWithoutId });

      scannedDocuments.push(...scans);
    }

    const maybeRemovedDocuments = alreadyUploadedDocuments.filter(document => !removedDocumentIdentifiers.includes(document?.id ?? ''));
    const companyDocumentsDraft = [...maybeRemovedDocuments, ...scannedDocuments];
    const companyDocuments = companyDocumentsDraft.map(({ id, fileName }) => ({ id, fileName })).filter(Boolean) as DocumentFileLinkInput[];

    if (isCorporateAccount) {
      await updateCorporateAccount({ companyDocuments, removeDocuments: documentsToRemove });
    } else {
      await updateTrustAccount({ companyDocuments, removeDocuments: documentsToRemove });
    }
  }

  return { uploadDocuments, uploadDocumentsMeta, addDocumentToRemove };
}
