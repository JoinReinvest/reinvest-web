import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputEmail } from 'components/FormElements/InputEmail';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { formValidationRules } from 'formValidationRules';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { forgotPassword } from 'services/auth/forgotPassword';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

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
      // TO-DO: Validate that the email pertains to an user
      //    - if so proceed to the next step by calling
      //    `moveToNextStep()`, otherwise display an error
      setIsLoading(true);
      const result = await forgotPassword(fields.email);

      updateStoreFields(fields);

      if (result === 'SUCCESS') {
        moveToNextStep();
      } else {
        setError(result);
      }

      setIsLoading(false);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Reset Password"
          subtitle="Enter the email associated with your account and we’ll send an email with instructions to reset your password."
        />

        {error && (
          <Typography
            variant="paragraph-large"
            className="mb-12 text-tertiary-error"
          >
            {error}
          </Typography>
        )}

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
