import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from 'components/Typography';
import { LoginLayout } from 'layouts/LoginLayout';
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
    <LoginLayout>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="register-form z-30 flex w-full max-w-330 flex-col items-center justify-center gap-16"
      >
        <Typography variant="h2">Sign up</Typography>
        <Typography variant="paragraph-large">Enter your email below to get started.</Typography>

        <EmailInput
          onChange={setEmail}
          value={email}
        />

        <Link
          href="/login"
          className="typo-paragraph-large"
        >
          Already have an account?
        </Link>

        <Button
          type="submit"
          label="Sign Up"
        />
      </form>
    </LoginLayout>
  );
};

export default RegisterPage;
