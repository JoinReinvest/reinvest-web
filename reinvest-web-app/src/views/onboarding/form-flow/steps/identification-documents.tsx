import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputFile } from 'components/FormElements/InputFile';
import { Title } from 'components/Title';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import { AccountType } from 'types/graphql';
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
      (fields.accountType === AccountType.Individual && allRequiredFieldsExists(requiredFields) && allRequiredFieldsExists(individualFields)) ||
      (fields.accountType !== AccountType.Individual && allRequiredFieldsExists(requiredFields))
    );
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const [isLoading, setIsLoading] = useState(false);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ identificationDocument }) => {
      try {
        setIsLoading(true);

        //  TO-DO: Upload files to S3
        updateStoreFields({ identificationDocument });

        //  TO-DO: Begin document verification process

        //  TO-DO: If documents are valid, update the meta field
        //      this will be useful for the `IDENTIFICATION_DOCUMENTS_VALIDATION`
        //      step to know if the documents were valid or not.
        updateStoreFields({ _didDocumentIdentificationValidationSucceed: true });
        setIsLoading(false);
        moveToNextStep();
      } catch (error) {
        //  TO-DO: Not sure if we want to move to the next step
        //      or display an error message.
        updateStoreFields({ _didDocumentIdentificationValidationSucceed: false });
        setIsLoading(false);
      }
    };

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
          />
        </Form>
      );
    }

    return null;
  },
};
