import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from 'components/Typography';
import { LoginLayout } from 'layouts/LoginLayout';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import zod, { Schema } from 'zod';

import { Button } from '../components/Button';
import { EmailInput } from '../components/FormElements/EmailInput';
import { PasswordInput } from '../components/FormElements/PasswordInput';
import { formValidationRules } from '../formValidationRules';

export interface LoginFormFields {
  email: string;
  password: string;
}

export const formSchema: Schema<LoginFormFields> = zod.object({
  email: formValidationRules.email,
  password: formValidationRules.password,
});

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const form = useForm<LoginFormFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async () => {
    console.log(form.getValues('email')); // eslint-disable-line
    console.log(form.getValues('password')); // eslint-disable-line
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

          <EmailInput
            onChange={setEmail}
            value={email}
          />
          <PasswordInput
            value={password}
            onChange={setPassword}
          />

          <Link
            href="/register/email"
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
