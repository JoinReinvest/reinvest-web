import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { GetHelpLink } from 'components/Links/GetHelp';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { LoginFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepCheckYourPhone: StepParams<LoginFormFields> = {
  identifier: Identifiers.PHONE_AUTHENTICATION,

  Component: ({ storeFields }: StepComponentProps<LoginFormFields>) => {
    const context = useAuth();
    const schema: Schema<LoginFormFields> = zod.object({
      email: formValidationRules.email,
      password: formValidationRules.password,
      authenticationCode: formValidationRules.authenticationCode,
    });
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
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

    const resendCodeOnClick = async () => {
      try {
        await Auth.signIn(storeFields.email, storeFields.password);

        setInfoMessage('Code has been sent');
      } catch (err) {
        setError((err as Error).message);
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Check Your Phone"
          subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
        />

        <div className="flex w-full flex-col gap-32">
          {error && <FormMessage message={error} />}

          {infoMessage && (
            <FormMessage
              message={infoMessage}
              variant="info"
            />
          )}

          <InputAuthenticationCode
            name="authenticationCode"
            control={control}
            required
          />

          <div className="flex justify-between">
            <OpenModalLink
              label="Resend code"
              green
              onClick={resendCodeOnClick}
            />
            <GetHelpLink />
          </div>
        </div>

        <ButtonStack>
          <Button
            type="submit"
            label="Sign Up"
            disabled={shouldButtonBeDisabled}
            loading={isValidatingCredentials}
          />
        </ButtonStack>
      </Form>
    );
  },
};
