import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputFile } from 'components/FormElements/InputFile';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { generateFileSchema } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DraftAccountType, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../../services/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from '../../../../services/queries/useSendDocumentsToS3AndGetScanIds';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'identificationDocument'>;

const ACCEPTED_FILE_MIME_TYPES: PartialMimeTypeKeys = ['jpeg', 'jpg', 'pdf', 'png'];
const FILE_SIZE_LIMIT_IN_MEGA_BYTES = 5.0;
const FILE_SCHEMA = generateFileSchema(ACCEPTED_FILE_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGA_BYTES);

const schema = z.object({
  identificationDocument: z.object({
    front: FILE_SCHEMA,
    back: FILE_SCHEMA,
  }),
});

export const StepIdentificationDocuments: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

  doesMeetConditionFields(fields) {
    const requiredFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
    ];

    const individualFields = [fields.ssn];

    return (
      allRequiredFieldsExists(requiredFields) &&
      ((fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(individualFields)) || fields.accountType !== DraftAccountType.Individual)
    );
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
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

    const onSubmit: SubmitHandler<Fields> = async ({ identificationDocument }) => {
      const idScan = [];

      if (identificationDocument?.front && identificationDocument?.back) {
        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: 2 })) as PutFileLink[];
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocument });
        idScan.push(...scans);
      }

      try {
        await updateStoreFields({ identificationDocument });
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
        <div className="flex items-center gap-32">
          <IconSpinner />

          <BlackModalTitle title="Verifying Account Information" />
        </div>
      );
    }

    if (!isLoading) {
      return (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle title="Please upload your Driver’s License or Passport for further verification" />
            {profileDetailsError && <FormMessage message={profileDetailsError.message} />}
            <div className="flex w-full flex-col gap-16">
              <InputFile
                name="identificationDocument.front"
                control={control}
                accepts={ACCEPTED_FILE_MIME_TYPES}
                sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGA_BYTES}
                placeholder="Upload ID Front"
              />

              <InputFile
                name="identificationDocument.back"
                control={control}
                accepts={ACCEPTED_FILE_MIME_TYPES}
                sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGA_BYTES}
                placeholder="Upload ID Back"
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
