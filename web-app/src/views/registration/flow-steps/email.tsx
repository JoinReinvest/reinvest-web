import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from 'services/form-flow';
import { FormFields } from '../form-fields';
import { formValidationRules } from 'formValidationRules';
import { zodResolver } from '@hookform/resolvers/zod';
import zod, { Schema } from 'zod';
import { Input } from 'components/FormElements/Input';
import { Typography } from 'components/Typography';
import Link from 'next/link';
import { Button } from 'components/Button';

type Fields = Pick<FormFields, 'email'>;

export const StepEmail: StepParams<FormFields> = {
  Component: ({ storeFields, updateStoreFields, moveToNextStep }) => {
    const schema: Schema<Fields> = zod.object({
      email: formValidationRules.email,
    });

    const { handleSubmit, control } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);

      // Validate that the email is not used
      moveToNextStep();
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="register-form z-30 flex w-full max-w-330 flex-col items-center justify-center gap-16"
      >
        <Typography variant="h2">Sign up</Typography>
        <Typography variant="paragraph-large">Enter your email below to get started.</Typography>

        <Input
          name="email"
          type="email"
          control={control}
          required
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
    );
  },
};
