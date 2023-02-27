import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputEmail } from 'components/FormElements/InputEmail';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { ForgotPasswordFormFields } from '../form-fields';

type Fields = Pick<ForgotPasswordFormFields, 'email'>;

export const StepEmail: StepParams<ForgotPasswordFormFields> = {
  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<ForgotPasswordFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      email: formValidationRules.email,
    });

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      // TO-DO: Validate that the email pertains to an user
      //    - if so proceed to the next step by calling
      //    `moveToNextStep()`, otherwise display an error

      updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Reset Password"
          subtitle="Enter the email associated with your account and we’ll send an email with instructions to reset your password."
        />

        <InputEmail
          control={control}
          name="email"
          required
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
