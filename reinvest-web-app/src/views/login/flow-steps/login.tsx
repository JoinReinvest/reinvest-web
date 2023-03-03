import { CognitoUser } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChallengeName, useAuth } from 'components/AuthProvider';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputEmail } from 'components/FormElements/InputEmail';
import { InputPassword } from 'components/FormElements/InputPassword';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { formValidationRules } from 'formValidationRules';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { URL } from '../../../constants/urls';
import { LoginFormFields } from '../form-fields';

type Fields = Omit<LoginFormFields, 'authenticationCode'>;

export const StepLogin: StepParams<LoginFormFields> = {
  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<LoginFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      email: formValidationRules.email,
      password: formValidationRules.password,
    });
    const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);
    const [error, setError] = useState<string>('');
    const authContext = useAuth();
    const { handleSubmit, control, formState } = useForm<LoginFormFields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      setIsValidatingCredentials(true);
      updateStoreFields(fields);
      const { email, password } = fields;
      const result = await authContext.actions.signIn(email, password);

      if (result instanceof Error) {
        setError(result.message);
      }

      const cognitoUser = result as CognitoUser;

      if (cognitoUser.challengeName === ChallengeName.SMS_MFA) {
        moveToNextStep();
      }

      setIsValidatingCredentials(false);
    };

    return (
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form z-30 flex max-w-330 flex-col items-center justify-center gap-16"
      >
        <Typography variant="h2">Sign in</Typography>
        <Typography variant="paragraph-large">Building your wealth while rebuilding our communities.</Typography>

        {error && (
          <Typography
            variant="paragraph-large"
            className="text-tertiary-error"
          >
            {error}
          </Typography>
        )}

        <InputEmail
          name="email"
          control={control}
        />

        <InputPassword
          name="password"
          control={control}
        />

        <Link
          href={URL.forgot_password}
          className="typo-paragraph-large"
          title="Forgot Password"
        >
          Forgot password?
        </Link>

        <Link
          href={URL.register}
          className="typo-paragraph-large"
          title="Don't have an account?"
        >
          Don’t have an account?
        </Link>

        <Button
          type="submit"
          label="Sign In"
          disabled={shouldButtonBeDisabled}
          loading={isValidatingCredentials}
        />
      </Form>
    );
  },
};
