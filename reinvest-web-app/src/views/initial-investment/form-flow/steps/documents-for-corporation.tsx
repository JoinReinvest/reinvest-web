import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DocumentFileLinkInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { IconSpinner } from '../../../../assets/icons/IconSpinner';
import { getApiClient } from '../../../../services/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from '../../../../services/queries/useSendDocumentsToS3AndGetScanIds';
import { ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES } from '../../../onboarding/form-flow/schemas';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<FlowFields, 'documentsForCorporation'>;

const MINIMUM_NUMBER_OF_FILES = 1;
const MAXIMUM_NUMBER_OF_FILES = 5;

const schema = z.object({
  documentsForCorporation: generateMultiFileSchema(ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES, MINIMUM_NUMBER_OF_FILES, MAXIMUM_NUMBER_OF_FILES),
});

export const StepDocumentsForCorporation: StepParams<FlowFields> = {
  identifier: Identifiers.DOCUMENTS_FOR_CORPORATION,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateCompanyData;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const [documentsToRemove, setDocumentsToRemove] = useState<DocumentFileLinkInput[]>([]);
    const [countDocumentsToUpload, setCountDocumentsToUpload] = useState<number>(0);
    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
    const defaultValues: Fields = { documentsForCorporation: storeFields.documentsForCorporation || [] };
    const { control, formState, handleSubmit } = useForm<Fields>({
      defaultValues: async () => defaultValues,
      resolver: zodResolver(schema),
      mode: 'all',
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ documentsForCorporation }) => {
      const idScan = [];
      const hasDocuments = !!documentsForCorporation?.length;
      const hasDocumentsToUpload = documentsForCorporation?.some(document => !!document.file);
      const documentsWithoutFile = documentsForCorporation?.map(({ id, fileName }) => ({ id, fileName }));

      if (hasDocuments && hasDocumentsToUpload) {
        const documentsToUpload = documentsForCorporation.map(({ file }) => file).filter(Boolean) as DocumentFile[];
        const numberOfDocumentsToUpload = documentsToUpload.length;
        setCountDocumentsToUpload(numberOfDocumentsToUpload);

        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: numberOfDocumentsToUpload })) as PutFileLink[];
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocuments: documentsForCorporation });

        idScan.push(...scans);
      }

      await updateStoreFields({ documentsForCorporation: documentsWithoutFile, documentsToRemove });

      moveToNextStep();
    };

    const subtitle = (
      <Typography variant="paragraph-large">
        <b>Required documents: </b>Articles of Incorporation, Certificate of Formation, By-laws, Shareholders and Authorized Signers List
      </Typography>
    );

    const onClearFileFromApi = (document: DocumentFile) => {
      setDocumentsToRemove(documentsToRemove => [...documentsToRemove, document as DocumentFileLinkInput]);
    };

    const loadingDocumentTitle = countDocumentsToUpload > 1 ? 'Documents' : 'Document';

    if (isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading) {
      return (
        <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
          <IconSpinner />

          <ModalTitle title={`Uploading Your ${loadingDocumentTitle}`} />
        </div>
      );
    }

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title="Upload the following documents to verify your organization."
            subtitle={subtitle}
          />

          <InputMultiFile
            name="documentsForCorporation"
            control={control}
            accepts={['pdf']}
            minimumNumberOfFiles={MINIMUM_NUMBER_OF_FILES}
            maximumNumberOfFiles={MAXIMUM_NUMBER_OF_FILES}
            onClearFileFromApi={onClearFileFromApi}
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
