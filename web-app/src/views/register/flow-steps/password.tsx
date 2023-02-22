import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputPassword } from 'components/FormElements/InputPassword';
import { WhyRequiredLink } from 'components/Links/WhyRequiredLink';
import { PasswordChecklist } from 'components/PasswordChecklist';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { FormFields } from '../form-fields';

interface Fields extends Pick<FormFields, 'password'> {
  passwordConfirmation: string;
}

export const StepPassword: StepParams<FormFields> = {
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FormFields>) => {
    const schema: Schema<Fields> = zod.object({
      password: formValidationRules.password,
      passwordConfirmation: formValidationRules.confirm_password,
    });

    const { handleSubmit, control, watch, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const fields = {
      password: watch('password'),
      passwordConfirmation: watch('passwordConfirmation'),
    };

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Sign up to REINVEST"
          subtitle="Create a unique password for your account to continue."
        />

        <InputPassword
          name="password"
          control={control}
        />

        <InputPassword
          name="passwordConfirmation"
          control={control}
        />

        <WhyRequiredLink href="/" />

        <PasswordChecklist
          password={fields.password}
          passwordConfirmation={fields.passwordConfirmation}
        />

        <Button
          type="submit"
          label="Sign Up"
          disabled={shouldButtonBeDisabled}
        />
      </Form>
    );
  },
};
