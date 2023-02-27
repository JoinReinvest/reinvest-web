import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputPassword } from 'components/FormElements/InputPassword';
import { PasswordChecklist } from 'components/PasswordChecklist';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { WhyRequiredBlackModalDialog } from 'components/WhyRequiredBlackModalDialog';
import { formValidationRules } from 'formValidationRules';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signup } from 'services/auth/signup';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { RegisterFormFields } from '../form-fields';

interface Fields extends Pick<RegisterFormFields, 'password'> {
  passwordConfirmation: string;
}

export const StepPassword: StepParams<RegisterFormFields> = {
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const [error, setError] = useState<string | undefined>('');
    const [whyRequiredOpened, setWhyRequiredOpened] = useState(false);
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

    const onSubmit: SubmitHandler<Fields> = async fields => {
      updateStoreFields(fields);

      await signup({ email: storeFields.email, password: fields.password, referralCode: storeFields.referralCode }, result => {
        if (typeof result === 'string') {
          return moveToNextStep();
        }

        return setError(result?.message);
      });
    };

    const openWhyReqiredOnClick = () => setWhyRequiredOpened(!whyRequiredOpened);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Sign up to REINVEST"
          subtitle="Create a unique password for your account to continue."
        />

        {whyRequiredOpened && (
          <WhyRequiredBlackModalDialog
            isOpen={whyRequiredOpened}
            onOpenChange={openWhyReqiredOnClick}
          />
        )}

        {error && (
          <Typography
            variant="paragraph-large"
            className="mb-12 text-tertiary-error"
          >
            {error}
          </Typography>
        )}

        <InputPassword
          name="password"
          control={control}
        />

        <InputPassword
          name="passwordConfirmation"
          control={control}
        />

        <Button
          label="Required. Why?"
          onClick={openWhyReqiredOnClick}
          className="why-required"
        />

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
