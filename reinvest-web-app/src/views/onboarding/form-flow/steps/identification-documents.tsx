import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DraftAccountType, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { IdScan, useSendDocumentsToS3AndGetScanIds } from '../../../../services/queries/useSendDocumentsToS3AndGetScanIds';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { FILE_SIZE_LIMIT_IN_MEGABYTES } from '../schemas';

type Fields = Pick<OnboardingFormFields, 'identificationDocuments'>;

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
      ((fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(individualFields)) || fields.accountType !== DraftAccountType.Individual)
    );
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { identificationDocuments: storeFields.identificationDocuments || [] };
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const {
      // error: createDocumentsFileLinksError,
      isLoading: isCreateDocumentsFileLinksLoading,
      mutateAsync: createDocumentsFileLinksMutate,
    } = useCreateDocumentsFileLinks(getApiClient);

    const {
      // error: sendDocumentsToS3AndGetScanIdsError,
      isLoading: isSendDocumentToS3AndGetScanIdsLoading,
      // isSuccess: isSendDocumentToS3AndGetScanIdsSuccess,
      mutateAsync: sendDocumentsToS3AndGetScanIdsMutate,
    } = useSendDocumentsToS3AndGetScanIds();

    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const shouldButtonBeDisabled =
      !formState.isValid || formState.isSubmitting || isLoading || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ identificationDocuments }) => {
      const idScan: IdScan[] = [];
      const hasIdentificationDocuments = !!identificationDocuments?.length;

      if (hasIdentificationDocuments) {
        const numberOFIdentificationDocuments = identificationDocuments.length;
        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: numberOFIdentificationDocuments })) as PutFileLink[];
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocuments });
        idScan.push(...scans);
      }

      try {
        await updateStoreFields({ identificationDocuments });
        await completeProfileMutate({ input: { idScan } });
      } catch (error) {
        await updateStoreFields({ _didDocumentIdentificationValidationSucceed: false });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    if (isLoading || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading) {
      return (
        <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
          <IconSpinner />

          <BlackModalTitle title="Uploading Your Document" />
        </div>
      );
    }

    if (!isLoading) {
      return (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle
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
