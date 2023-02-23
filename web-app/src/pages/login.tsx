import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from 'components/Typography';
import { LoginLayout } from 'layouts/LoginLayout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import zod, { Schema } from 'zod';

import { Button } from '../components/Button';
import { EmailInput } from '../components/FormElements/EmailInput';
import { PasswordInput } from '../components/FormElements/PasswordInput';
import { URL } from '../constants/urls';
import { formValidationRules } from '../formValidationRules';

interface Fields {
  email: string;
  password: string;
}

const schema: Schema<Fields> = zod.object({
  email: formValidationRules.email,
  password: formValidationRules.password,
});

const Login: NextPage = () => {
  const [error, setError] = useState<string>('');
  const form = useForm<Fields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const callbackUrl = (router.query?.callbackUrl as string) ?? '/';

  const onSubmit: SubmitHandler<Fields> = async fields => {
    const result = await signIn('credentials', {
      email: fields.email,
      password: fields.password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      await router.push(callbackUrl);
    }
  };

  return (
    <LoginLayout>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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

          <EmailInput />
          <PasswordInput />

          <Link
            href={URL.forgot_password}
            className="typo-paragraph-large"
          >
            Forgot password?
          </Link>

          <Button
            type="submit"
            label="Sign In"
          />
        </form>
      </FormProvider>
    </LoginLayout>
  );
};

export default Login;
