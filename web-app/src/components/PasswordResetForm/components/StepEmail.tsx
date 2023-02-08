import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { TextInput } from 'components/TextInput';
import { Typography } from 'components/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

interface FormFields {
  email: string;
}

export const StepEmail = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: 'firstError',
  });

  const onSubmit: SubmitHandler<FormFields> = async values => {
    console.info(values);
  };

  return (
    <div className="flex h-full flex-col gap-60 md:gap-36">
      <div className="flex flex-col gap-8">
        <Typography
          variant="heading-5"
          className="md:text-center"
        >
          Reset Password
        </Typography>
        <Typography variant="paragraph">
          Enter the email associated with your account and we’ll send an email with instructions to reset your password.
        </Typography>
      </div>

      <form
        className="flex h-full flex-col gap-24 max-md:justify-between"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <TextInput
          {...form.register('email')}
          value={form.watch('email')}
          placeholder="Email Address"
          type="email"
          control={form.control}
          className="md:grow"
          error={form.formState.errors?.email?.message}
        />

        <Button
          type="submit"
          label="Continue"
          disabled={!form.formState.isValid}
        />
      </form>
    </div>
  );
};
