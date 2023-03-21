import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputFile } from 'components/FormElements/InputFile';
import { Title } from 'components/Title';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { DraftAccountType } from 'types/graphql';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'identificationDocument'>;

const schema = z.object({
  identificationDocument: z.object({
    frontSide: z.custom<File>().nullable(),
    backSide: z.custom<File>().nullable(),
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

    const individualFields = [fields.socialSecurityNumber];

    return (
      (fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(requiredFields) && allRequiredFieldsExists(individualFields)) ||
      (fields.accountType !== DraftAccountType.Individual && allRequiredFieldsExists(requiredFields))
    );
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit, getValues } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const {
      isLoading,
      updateData,
      isSuccess,
      error: { profileDetailsError },
    } = useUpdateDataIndividualOnboarding({ ...storeFields, ...getValues() });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      try {
        updateStoreFields(fields);
        updateStoreFields({ _didDocumentIdentificationValidationSucceed: true, ...getValues() });
        updateData(Identifiers.IDENTIFICATION_DOCUMENTS);
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

          <Title title="Verifying Account Information" />
        </div>
      );
    }

    if (!isLoading) {
      return (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title title="Please upload your Driver’s License or Passport for further verification" />

          {profileDetailsError && <FormMessage message={profileDetailsError.message} />}

          <InputFile
            name="identificationDocument.front"
            control={control}
            label="Upload ID Front"
            placeholder="Upload File"
          />

          <InputFile
            name="identificationDocument.back"
            control={control}
            label="Upload ID Back"
            placeholder="Upload File"
          />

          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={isLoading}
          />
        </Form>
      );
    }

    return null;
  },
};
