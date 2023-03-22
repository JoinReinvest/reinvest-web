import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'documentsForTrust'>;

const MINIMUM_NUMBER_OF_FILES = 2;

const schema = z.object({
  documentsForTrust: z.custom<File>().array().min(MINIMUM_NUMBER_OF_FILES, `You must upload at least ${MINIMUM_NUMBER_OF_FILES} file(s)`),
});

export const StepDocumentsForTrust: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.DOCUMENTS_FOR_TRUST,

  willBePartOfTheFlow: fields => {
    return fields.accountType === 'TRUST';
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { documentsForTrust: storeFields.documentsForTrust || [] };
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ documentsForTrust }) => {
      await updateStoreFields({ documentsForTrust });
      moveToNextStep();
    };

    const subtitle = (
      <>
        <b>Required documents: </b>The Full Trust Document or Certification of Trust,List of All Trustees, Grantors and Protectors.
      </>
    );

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <BlackModalTitle
          title="Upload the following documents to verify your trust."
          subtitle={subtitle}
        />

        <InputMultiFile
          name="documentsForTrust"
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
