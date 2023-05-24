import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { ModalTitle } from 'components/ModalElements/Title';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DocumentFileLinkInput, DraftAccountType, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from '../../../../services/queries/useSendDocumentsToS3AndGetScanIds';
import { Applicant, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { FILE_SIZE_LIMIT_IN_MEGABYTES } from '../schemas';

type Fields = Exclude<Applicant, undefined>;

const ACCEPTED_FILE_MIME_TYPES: PartialMimeTypeKeys = ['jpeg', 'jpg', 'pdf', 'png'];
const MINIMUM_NUMBER_OF_FILES = 1;
const MAXIMUM_NUMBER_OF_FILES = 5;

const schema = z.object({
  identificationDocuments: generateMultiFileSchema(ACCEPTED_FILE_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES, MINIMUM_NUMBER_OF_FILES, MAXIMUM_NUMBER_OF_FILES),
});

export const StepIdentificationDocuments: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    const individualFields = [fields.ssn];

    return (
      allRequiredFieldsExists(requiredFields) &&
      ((fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(individualFields)) ||
        fields.accountType !== DraftAccountType.Individual) &&
      !fields.isCompletedProfile
    );
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { identificationDocuments: storeFields.identificationDocuments || [] };
    const [countDocumentsToUpload, setCountDocumentsToUpload] = useState<number>(0);
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);

    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();

    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const shouldButtonBeDisabled =
      !formState.isValid || formState.isSubmitting || isLoading || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading;

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

      try {
        const hasIdScans = !!idScan?.length;
        await updateStoreFields({ identificationDocuments: documentsWithoutFile });

        if (hasIdScans) {
          await completeProfileMutate({ input: { idScan } });
        } else {
          moveToNextStep();
        }
      } catch (error) {
        await updateStoreFields({ _didDocumentIdentificationValidationSucceed: false });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const loadingDocumentTitle = countDocumentsToUpload > 1 ? 'Documents' : 'Document';

    if (isLoading || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading) {
      return (
        <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
          <IconSpinner />

          <ModalTitle title={`Uploading Your ${loadingDocumentTitle}`} />
        </div>
      );
    }

    if (!isLoading) {
      return (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <ModalTitle
              title="Please upload your Driver’s License or Passport for further verification"
              subtitle="Valid identification includes Driver's license, Permanent Resident card or a non-expired Passport."
            />

            {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}
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
              loading={isLoading || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading}
            />
          </ButtonStack>
        </Form>
      );
    }

    return null;
  },
};
