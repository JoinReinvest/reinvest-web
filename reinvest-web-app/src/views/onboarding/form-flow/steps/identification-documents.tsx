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
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { z } from 'zod';

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
    const { control, formState, handleSubmit, getValues } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const {
      isLoading,
      updateData,
      isSuccess,
      error: { profileDetailsError },
    } = useUpdateDataIndividualOnboarding();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      try {
        await updateStoreFields(fields);
        await updateData(Identifiers.IDENTIFICATION_DOCUMENTS, { ...storeFields, ...getValues() });
      } catch (error) {
        updateStoreFields({ _didDocumentIdentificationValidationSucceed: false });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    if (isLoading) {
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
              loading={isLoading}
            />
          </ButtonStack>
        </Form>
      );
    }

    return null;
  },
};
