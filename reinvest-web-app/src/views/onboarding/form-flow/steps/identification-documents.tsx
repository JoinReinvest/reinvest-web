import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { InputFile } from 'components/FormElements/InputFile';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'identificationDocument'>;

const schema = z.object({
  identificationDocument: z.object({
    frontSide: z.custom<File>(),
    backSide: z.custom<File>(),
  }),
});

export const StepIdentificationDocuments: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

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
        await updateStoreFields({ identificationDocument });

        //  TO-DO: Begin document verification process

        //  TO-DO: If documents are valid, update the meta field
        //      this will be useful for the `IDENTIFICATION_DOCUMENTS_VALIDATION`
        //      step to know if the documents were valid or not.
        await updateStoreFields({ _didDocumentIdentificationValidationSucceed: true });
        setIsLoading(false);
        moveToNextStep();
      } catch (error) {
        //  TO-DO: Not sure if we want to move to the next step
        //      or display an error message.
        await updateStoreFields({ _didDocumentIdentificationValidationSucceed: false });
        setIsLoading(false);
      }
    };

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
          <BlackModalTitle title="Please upload your Driver’s License or Passport for further verification" />

          <div className="flex w-full flex-col gap-16">
            <InputFile
              name="identificationDocument.front"
              control={control}
              placeholder="Upload ID Front"
            />

            <InputFile
              name="identificationDocument.back"
              control={control}
              placeholder="Upload ID Back"
            />
          </div>

          <ButtonStack>
            <Button
              type="submit"
              label="Continue"
              disabled={shouldButtonBeDisabled}
            />
          </ButtonStack>
        </Form>
      );
    }

    return null;
  },
};
