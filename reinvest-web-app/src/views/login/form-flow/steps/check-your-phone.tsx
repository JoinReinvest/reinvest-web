import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { GetHelpLink } from 'components/Links/GetHelp';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { ModalTitle } from 'components/ModalElements/Title';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { maskPhoneNumber } from 'utils/phone-number';
import zod, { Schema } from 'zod';

import { LoginFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Omit<LoginFormFields, 'user'>;

const schema: Schema<Fields> = zod.object({
  email: formValidationRules.email,
  password: formValidationRules.password,
  authenticationCode: formValidationRules.authenticationCode,
});

export const StepCheckYourPhone: StepParams<LoginFormFields> = {
  identifier: Identifiers.PHONE_AUTHENTICATION,

  Component: ({ storeFields }: StepComponentProps<LoginFormFields>) => {
    const context = useAuth();
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);
    const { handleSubmit, control, formState } = useForm<LoginFormFields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    // @ts-expect-error - cognito wraps the CognitoUser class
    const phoneNumber = storeFields?.user?.challengeParam?.CODE_DELIVERY_DESTINATION;
    const maskedPhoneNumber = maskPhoneNumber(phoneNumber);
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<LoginFormFields> = async ({ authenticationCode }) => {
      const { user } = storeFields;
      setIsValidatingCredentials(true);

      try {
        if (user) {
          await context.actions.confirmSignIn(authenticationCode, user);
        }
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
        <FormContent>
          <ModalTitle
            title="Check Your Phone"
            subtitle={`Enter the SMS authentication code sent to your phone ${maskedPhoneNumber}`}
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
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Sign In"
            disabled={shouldButtonBeDisabled}
            loading={isValidatingCredentials}
          />
        </ButtonStack>
      </Form>
    );
  },
};
