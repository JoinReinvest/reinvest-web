import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { Title } from 'components/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'documentsForCorporation'>;

const MINIMUM_NUMBER_OF_FILES = 5;

const schema = z.object({
  documentsForCorporation: z.custom<File>().array().min(MINIMUM_NUMBER_OF_FILES, `You must upload at least ${MINIMUM_NUMBER_OF_FILES} file(s)`),
});

export const StepDocumentsForCorporation: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.DOCUMENTS_FOR_TRUST,

  willBePartOfTheFlow: fields => {
    return fields.accountType === 'CORPORATE';
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { documentsForCorporation: storeFields.documentsForCorporation || [] };
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ documentsForCorporation }) => {
      await updateStoreFields({ documentsForCorporation });
      moveToNextStep();
    };

    const subtitle = (
      <>
        <b>Required documents: </b>Articles of Incorporation, Certificate of Formation, By-laws, Shareholders and Authorized Signers List
      </>
    );

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Upload the following documents to verify your organization."
          subtitle={subtitle}
        />

        <InputMultiFile
          name="documentsForCorporation"
          control={control}
          accepts={['pdf']}
          minimumNumberOfFiles={MINIMUM_NUMBER_OF_FILES}
        />

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
