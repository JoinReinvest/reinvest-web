import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputBirthDate } from 'components/FormElements/InputBirthDate';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'dateOfBirth'>;

const schema = z.object({
  dateOfBirth: formValidationRules.date,
});

export const StepDateOfBirth: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.DATE_OF_BIRTH,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title title="Enter your first and last name as it appears on your ID" />

        <InputBirthDate
          name="dateOfBirth"
          control={control}
        />

        <OpenModalLink
          label="Required. Why?"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={() => {}}
        />

        <Button
          type="submit"
          label="Continue"
          disabled={shouldButtonBeDisabled}
        />
      </Form>
    );
  },
};
