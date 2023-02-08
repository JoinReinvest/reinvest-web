import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import { TextInput } from 'components/TextInput';
import { Typography } from 'components/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { PasswordChecklist } from './PasswordChecklist';

const schema = z.object({
  password: z.string(),
  passwordConfirmation: z.string(),
});

interface FormFields {
  password: string;
  passwordConfirmation: string;
}

export const StepPasswordCreation = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: 'firstError',
  });

  const passwordField = form.watch('password');
  const passwordConfirmationField = form.watch('passwordConfirmation');

  const onSubmit: SubmitHandler<FormFields> = async values => {
    console.info(values);
  };

  return (
    <div className="h-full">
      <div className="flex h-full flex-col max-md:gap-60 md:gap-16">
        <div className="flex flex-col gap-8">
          <Typography
            variant="heading-5"
            className="md:pb-36 md:text-center"
          >
            Create new password
          </Typography>

          <Typography variant="paragraph">Create a unique password for your account to continue.</Typography>
        </div>

        <form
          className="flex h-full flex-col gap-16 max-md:justify-between"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TextInput
            {...form.register('password')}
            value={form.watch('password')}
            placeholder="Password"
            type="password"
            control={form.control}
            error={form.formState.errors?.password?.message}
          />

          <TextInput
            {...form.register('passwordConfirmation')}
            value={form.watch('passwordConfirmation')}
            placeholder="Confirm Password"
            type="password"
            control={form.control}
            className="md:grow"
            error={form.formState.errors?.passwordConfirmation?.message}
          />

          <Link
            href="/"
            title="Why is a password required?"
            className="max-md:hidden"
          >
            Required. Why?
          </Link>

          <div className="flex gap-16 max-md:flex-col md:flex-col-reverse">
            <PasswordChecklist
              password={passwordField}
              passwordConfirmation={passwordConfirmationField}
            />

            <Button
              type="submit"
              label="Continue"
              disabled={!form.formState.isValid}
              className="w-full max-md:mt-60"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
