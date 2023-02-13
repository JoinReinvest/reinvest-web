import { zodResolver } from '@hookform/resolvers/zod';
import { formValidationRules } from 'formValidationRules';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import zod, { Schema } from 'zod';

import { ConfirmPasswordInput } from './ConfirmPasswordInput';
import { PasswordInput } from './PasswordInput';

export interface CreatePasswordForm {
  confirm_password: string;
  password: string;
}

export const formSchema: Schema<CreatePasswordForm> = zod.object({
  confirm_password: formValidationRules.password,
  password: formValidationRules.password,
});

export const CreatePasswordForm = () => {
  const form = useForm<CreatePasswordForm>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<CreatePasswordForm> = async () => {
    console.log(form.getValues('password')); // eslint-disable-line
    console.log(form.getValues('confirm_password')); // eslint-disable-line
  };

  return (
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
  );
};
