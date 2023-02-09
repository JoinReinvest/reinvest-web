import { zodResolver } from '@hookform/resolvers/zod';
import { LogoIcon } from 'assets/LogoIcon';
import { Typography } from 'components/Typography';
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
    console.log(form.getValues('email')) // eslint-disable-line
    console.log(form.getValues('password')) // eslint-disable-line
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-84 text-center text-white">
      <video
        autoPlay
        loop
        muted
        className="absolute h-screen w-screen object-cover"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <LogoIcon className="z-30" />

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
            href="/"
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
    </div>
  );
};

export default Login;
