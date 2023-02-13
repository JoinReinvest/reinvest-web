import { zodResolver } from '@hookform/resolvers/zod';
import { ConfirmPasswordInput } from 'components/FormElements/ConfirmPasswordInput';
import { PasswordInput } from 'components/FormElements/PasswordInput';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import zod, { Schema } from 'zod';

import { BlackModal } from '../../components/BlackModal';
import { PasswordChecklist } from '../../components/PasswordChecklist';
import { Title } from '../../components/Title';
import { formValidationRules } from '../../formValidationRules';
import { MainLayout } from '../../layouts/MainLayout';

export interface PasswordCreationFields {
  email: string;
  password: string;
}

export const formSchema: Schema<PasswordCreationFields> = zod.object({
  email: formValidationRules.email,
  password: formValidationRules.password,
});

const PasswordCreationPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<PasswordCreationFields>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const onSubmit: SubmitHandler<PasswordCreationFields> = async () => {
    console.log(form.getValues('email')); // eslint-disable-line
    console.log(form.getValues('password')); // eslint-disable-line
  };

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title
          title="Create new password"
          subtitle="Create a unique password for your account to continue."
        />

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-330 z-30 flex flex-col items-center justify-center gap-16"
          >
            <PasswordInput
              onChange={console.log} // eslint-disable-line
              value={'email@example.com'}
            />
            <ConfirmPasswordInput
              onChange={console.log} // eslint-disable-line
              value={'email@example.com'}
            />
          </form>
        </FormProvider>

        <PasswordChecklist
          password={'test'}
          passwordConfirmation={'test'}
        />
      </BlackModal>
    </MainLayout>
  );
};

export default PasswordCreationPage;
