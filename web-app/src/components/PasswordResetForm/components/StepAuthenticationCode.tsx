import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import { TextInput } from 'components/TextInput';
import { Typography } from 'components/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  authenticationCode: z.string(),
});

interface FormFields {
  authenticationCode: string;
}

interface Props {
  email: string;
}

export const StepAuthenticationCode = ({ email }: Props) => {
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
          Check Your Email
        </Typography>
        <Typography variant="paragraph">Enter the email authentication code sent to your email {email}.</Typography>
      </div>

      <form
        className="flex h-full flex-col gap-24 max-md:justify-between"
        onSubmit={form.handleSubmit(onSubmit, errors => console.info(errors))}
      >
        <div>
          <TextInput
            {...form.register('authenticationCode')}
            value={form.watch('authenticationCode')}
            placeholder="Authentication Code"
            type="email"
            control={form.control}
            className="md:grow"
            error={form.formState.errors?.authenticationCode?.message}
          />

          <div className="flex justify-between">
            <Link
              href="/"
              title="Re-send authentication code"
            >
              Resend Code
            </Link>
            <Link
              href="/"
              title="Get help"
            >
              Get Help
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          label="Sign In"
          disabled={!form.formState.isValid}
        />
      </form>
    </div>
  );
};
