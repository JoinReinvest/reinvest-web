import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from 'components/AuthProvider';
import { Button } from 'components/Button';
import { ErrorMessage } from 'components/ErrorMessage';
import { Form } from 'components/FormElements/Form';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { GetHelpLink } from 'components/Links/GetHelp';
import { ResendCodeLink } from 'components/Links/ResendCodeLink';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { LoginFormFields } from '../form-fields';

export const StepCheckYourPhone: StepParams<LoginFormFields> = {
  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<LoginFormFields>) => {
    const context = useAuth()
    const schema: Schema<LoginFormFields> = zod.object({
      email: formValidationRules.email,
      password: formValidationRules.password,
      authenticationCode: formValidationRules.authenticationCode,
    });
    const [error, setError] = useState('');
    const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);

    const { handleSubmit, control, formState } = useForm<LoginFormFields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<LoginFormFields> = async fields => {
      setIsValidatingCredentials(true);
      try {
        await context.actions.confirmSignIn(fields.authenticationCode);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsValidatingCredentials(false);
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Check Your Phone"
          subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
        />

        <ErrorMessage message={error} />

        <InputAuthenticationCode
          name="authenticationCode"
          control={control}
          required
        />

        <div className="my-20 flex justify-between">
          <ResendCodeLink href="/" />
          <GetHelpLink />
        </div>

        <Button
          type="submit"
          label="Sign Up"
          variant="default"
          disabled={shouldButtonBeDisabled}
          loading={isValidatingCredentials}
        />
      </Form>
    );
  },
};
