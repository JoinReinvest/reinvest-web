import { CognitoUser } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { InputEmail } from 'components/FormElements/InputEmail';
import { InputPassword } from 'components/FormElements/InputPassword';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { URL } from 'constants/urls';
import { formValidationRules } from 'formValidationRules';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { FormMessage } from '../../../components/FormElements/FormMessage';
import { ChallengeName, useAuth } from '../../../providers/AuthProvider';
import { LoginFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Omit<LoginFormFields, 'authenticationCode'>;

export const StepLogin: StepParams<LoginFormFields> = {
  identifier: Identifiers.CREDENTIALS,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<LoginFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      email: formValidationRules.email,
      password: formValidationRules.password,
    });
    const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);
    const [error, setError] = useState<string>('');
    const { actions, loading, user } = useAuth();
    const { handleSubmit, control, formState } = useForm<LoginFormFields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const router = useRouter();

    const onSubmit: SubmitHandler<Fields> = async fields => {
      setError('');
      setIsValidatingCredentials(true);
      updateStoreFields(fields);

      const { email, password } = fields;

      try {
        const result = await actions.signIn(email, password, router.query.redirectUrl);

        const cognitoUser = result as CognitoUser;

        if (cognitoUser.challengeName === ChallengeName.SMS_MFA) {
          moveToNextStep();
        }

        setIsValidatingCredentials(false);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    if (loading && !user) {
      return <IconSpinner />;
    }

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form z-30 flex w-full max-w-330 flex-col items-center justify-center gap-16"
      >
        <Typography variant="h2">Sign in</Typography>
        <Typography variant="paragraph-large">Building your wealth while rebuilding our communities.</Typography>

        {error && <FormMessage message={error} />}

        <InputEmail
          name="email"
          control={control}
          required
        />

        <InputPassword
          name="password"
          control={control}
          required
        />

        <Link
          href={URL.forgot_password}
          title="Forgot Password"
        >
          Forgot password?
        </Link>

        <Link
          href={URL.register}
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
      </form>
    );
  },
};
