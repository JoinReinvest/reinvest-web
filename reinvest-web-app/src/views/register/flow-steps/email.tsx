import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { InputEmail } from 'components/FormElements/InputEmail';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { URL } from 'constants/urls';
import { formValidationRules } from 'formValidationRules';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { RegisterFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<RegisterFormFields, 'email'>;

export const StepEmail: StepParams<RegisterFormFields> = {
  identifier: Identifiers.EMAIL,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const [isValidatingEmail, setIsValidatingEmail] = useState(false);

    const schema: Schema<Fields> = zod.object({
      email: formValidationRules.email,
    });

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      try {
        setIsValidatingEmail(true);
        updateStoreFields(fields);
        setIsValidatingEmail(false);
        moveToNextStep();
      } catch (error) {
        setIsValidatingEmail(false);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="register-form z-30 flex w-full max-w-330 flex-col items-center justify-center gap-16"
      >
        <Typography variant="h2">Sign up</Typography>
        <Typography variant="paragraph-large">Enter your email below to get started.</Typography>

        <InputEmail
          name="email"
          control={control}
          required
        />

        <Link
          href={URL.login}
          title="Log in"
        >
          Already have an account?
        </Link>

        <Button
          type="submit"
          label="Sign Up"
          disabled={shouldButtonBeDisabled}
          loading={isValidatingEmail}
        />
      </form>
    );
  },
};
