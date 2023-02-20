import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from 'services/form-flow';
import { FormFields } from '../form-fields';
import { formValidationRules } from 'formValidationRules';
import { zodResolver } from '@hookform/resolvers/zod';
import zod, { Schema } from 'zod';
import { Input } from 'components/FormElements/Input';
import { Typography } from 'components/Typography';
import { WhyRequiredLink } from 'components/Links/WhyRequiredLink';
import { Button } from 'components/Button';
import { PasswordChecklist } from 'components/PasswordChecklist';

interface Fields extends Pick<FormFields, 'password'> {
  passwordConfirmation: string;
}

export const StepPassword: StepParams<FormFields> = {
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }) => {
    const schema: Schema<Fields> = zod.object({
      password: formValidationRules.password,
      passwordConfirmation: formValidationRules.confirm_password,
    });

    const { handleSubmit, control, watch } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    const fields = {
      password: watch('password'),
      passwordConfirmation: watch('passwordConfirmation'),
    };

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2">Sign up</Typography>
        <Typography variant="paragraph-large">Enter your email below to get started.</Typography>

        <Input
          name="password"
          control={control}
          type="password"
          placeholder="Password"
          required
        />

        <Input
          name="passwordConfirmation"
          control={control}
          placeholder="Confirm Password"
          required
        />

        <WhyRequiredLink href="/" />

        <PasswordChecklist
          password={fields.password}
          passwordConfirmation={fields.passwordConfirmation}
        />

        <Button
          type="submit"
          label="Sign Up"
        />
      </form>
    );
  },
};
