import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { InputEmail } from 'components/FormElements/InputEmail';
import { InputPassword } from 'components/FormElements/InputPassword';
import { Link } from 'components/Link';
import { GetHelpLink } from 'components/Links/GetHelp';
import { ResendCodeLink } from 'components/Links/ResendCodeLink';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { formValidationRules } from 'formValidationRules';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
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
    const { handleSubmit, control, formState } = useForm<LoginFormFields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const router = useRouter();
    const callbackUrl = (router.query?.callbackUrl as string) ?? '/';

    const onSubmit: SubmitHandler<Fields> = async fields => {
      console.log(fields);
      setIsValidatingCredentials(true);
      const result = await signIn('credentials', {
        email: fields.email,
        password: fields.password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // await router.push(callbackUrl);
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
