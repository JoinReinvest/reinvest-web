import { CognitoUser } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputEmail } from 'components/FormElements/InputEmail';
import { InputPassword } from 'components/FormElements/InputPassword';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { ChallengeName, useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import zod, { Schema } from 'zod';

import { LoginFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Omit<LoginFormFields, 'authenticationCode' | 'user'>;

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
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || (!loading && !!user);
    const router = useRouter();

    const onSubmit: SubmitHandler<Fields> = async fields => {
      setError('');
      setIsValidatingCredentials(true);
      await updateStoreFields(fields);

      const { email, password } = fields;

      const result = await actions.signIn(email, password, router.query.redirectUrl as string);

      if (result instanceof Error) {
        setError(result.message);
      }

      const cognitoUser = result as CognitoUser;

      if (cognitoUser.challengeName === ChallengeName.SMS_MFA && result instanceof CognitoUser) {
        await updateStoreFields({ user: result });
        moveToNextStep();
      }

      setIsValidatingCredentials(false);
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form z-20 flex w-full max-w-330 flex-col items-start justify-center gap-24 lg:items-center"
      >
        <div className="flex w-full flex-col items-start gap-16 lg:items-center">
          <Typography variant="h1">Sign in</Typography>

          <Typography
            variant="bonus-heading"
            className="text-left lg:w-11/12 lg:text-center"
          >
            Building your wealth while rebuilding our communities.
          </Typography>
        </div>

        {error && <FormMessage message={error} />}

        <div className="flex w-full flex-col items-start gap-12 lg:items-center">
          <InputEmail
            name="email"
            control={control}
            required
          />

          <InputPassword
            name="password"
            control={control}
            required
            iconWhite={false}
          />

          <Link
            href={URL.forgot_password}
            title="Forgot Password"
            className="typo-link text-white"
          >
            Forgot password?
          </Link>

          <Link
            href={URL.register}
            title="Don't have an account?"
            className="typo-link text-white"
          >
            Don’t have an account?
          </Link>
        </div>

        <Button
          type="submit"
          label="Sign In"
          disabled={shouldButtonBeDisabled}
          loading={isValidatingCredentials || (!loading && !!user)}
        />
      </form>
    );
  },
};
