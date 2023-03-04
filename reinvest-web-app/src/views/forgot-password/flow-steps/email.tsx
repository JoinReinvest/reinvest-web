import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputEmail } from 'components/FormElements/InputEmail';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { FormMessage } from '../../../components/FormElements/FormMessage';
import { ForgotPasswordFormFields } from '../form-fields';

type Fields = Pick<ForgotPasswordFormFields, 'email'>;

export const StepEmail: StepParams<ForgotPasswordFormFields> = {
  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<ForgotPasswordFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      email: formValidationRules.email,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      setIsLoading(true);
      updateStoreFields(fields);

      try {
        await Auth.forgotPassword(fields.email);

        moveToNextStep();
      } catch (err) {
        setError(err as string);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Reset Password"
          subtitle="Enter the email associated with your account and we’ll send an email with instructions to reset your password."
        />

        {error && <FormMessage message={error} />}

        <InputEmail
          control={control}
          name="email"
          required
        />

        <Button
          type="submit"
          label="Continue"
          disabled={shouldButtonBeDisabled}
          loading={isLoading}
        />
      </Form>
    );
  },
};
