import { zodResolver } from '@hookform/resolvers/zod';
import { LogoIcon } from 'assets/LogoIcon';
import LoginBackground from 'assets/videos/login-background.mp4';
import { Typography } from 'components/Typography';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import zod, { Schema } from 'zod';

import { Button } from '../../components/Button';
import { EmailInput } from '../../components/FormElements/EmailInput';
import { formValidationRules } from '../../formValidationRules';

export interface RegisterFormFields {
  email: string;
}

export const formSchema: Schema<RegisterFormFields> = zod.object({
  email: formValidationRules.email,
});

const RegisterPage: NextPage = () => {
  const [email, setEmail] = useState<string>('');

  const form = useForm<RegisterFormFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async () => {
    console.log(form.getValues('email')); // eslint-disable-line
  };

  return (
    <div className="gap-84 flex h-screen flex-col items-center justify-center text-center text-white">
      <video
        autoPlay
        loop
        muted
        className="absolute h-screen w-screen object-cover"
      >
        <source
          src={LoginBackground}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <LogoIcon className="z-30" />

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="login-form max-w-330 z-30 flex w-full flex-col items-center justify-center gap-16"
        >
          <Typography variant="h2">Sign up</Typography>
          <Typography variant="paragraph-large">Enter your email below to get started.</Typography>

          <EmailInput
            onChange={setEmail}
            value={email}
          />

          <Link
            href="/"
            className="typo-paragraph-large"
          >
            Already have an account?
          </Link>

          <Button
            type="submit"
            label="Sign Up"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterPage;
