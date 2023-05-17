import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { ModalTitle } from 'components/ModalElements/Title';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DocumentFileLinkInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { useSendDocumentsToS3AndGetScanIds } from '../../../../services/queries/useSendDocumentsToS3AndGetScanIds';
import { Applicant } from '../../../onboarding/form-flow/form-fields';
import { FILE_SIZE_LIMIT_IN_MEGABYTES } from '../../../onboarding/form-flow/schemas';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Exclude<Applicant, undefined>;

const ACCEPTED_FILE_MIME_TYPES: PartialMimeTypeKeys = ['jpeg', 'jpg', 'pdf', 'png'];
const MINIMUM_NUMBER_OF_FILES = 1;
const MAXIMUM_NUMBER_OF_FILES = 5;

const schema = z.object({
  identificationDocuments: generateMultiFileSchema(ACCEPTED_FILE_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES, MINIMUM_NUMBER_OF_FILES, MAXIMUM_NUMBER_OF_FILES),
});

export const StepIdentificationDocuments: StepParams<FlowFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = { identificationDocuments: storeFields.identificationDocuments || [] };
    const [countDocumentsToUpload, setCountDocumentsToUpload] = useState<number>(0);
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);

    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ identificationDocuments }) => {
      const existedDocuments = identificationDocuments?.filter(document => !!document.id) as DocumentFileLinkInput[];
      const idScan = existedDocuments?.length ? [...existedDocuments] : [];

      const hasDocuments = !!identificationDocuments?.length;
      const hasDocumentsToUpload = identificationDocuments?.some(document => !!document.file);
      const documentsWithoutFile = identificationDocuments?.map(({ id, fileName }) => ({ id, fileName }));

      if (hasDocuments && hasDocumentsToUpload) {
        const documentsToUpload = identificationDocuments.map(({ file }) => file).filter(Boolean) as DocumentFile[];
        const numberOfDocumentsToUpload = documentsToUpload.length;
        setCountDocumentsToUpload(numberOfDocumentsToUpload);
        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: numberOfDocumentsToUpload })) as PutFileLink[];
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocuments: documentsToUpload });
        idScan.push(...scans);
      }

      const hasIdScans = !!idScan?.length;
      await updateStoreFields({ identificationDocuments: documentsWithoutFile });

      if (hasIdScans) {
        moveToNextStep();
      } else {
        moveToNextStep();
      }
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
            title="Please upload your Driver’s License or Passport for further verification"
            subtitle="Valid identification includes Driver's license, Permanent Resident card or a non-expired Passport."
          />

          <div className="flex w-full flex-col">
            <InputMultiFile
              name="identificationDocuments"
              minimumNumberOfFiles={MINIMUM_NUMBER_OF_FILES}
              maximumNumberOfFiles={MAXIMUM_NUMBER_OF_FILES}
              sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGABYTES}
              accepts={ACCEPTED_FILE_MIME_TYPES}
              control={control}
              placeholderOnEmpty="Upload Files"
              placeholderOnMeetsMinimum="Add Additional Files"
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
