import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputPassword } from 'components/FormElements/InputPassword';
import { WhyRequiredLink } from 'components/Links/WhyRequiredLink';
import { PasswordChecklist } from 'components/PasswordChecklist';
import { Title } from 'components/Title';
import { WhyRequiredBlackModal } from 'components/WhyRequiredBlackModal';
import { formValidationRules } from 'formValidationRules';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
    const [isWhyRequiredOpen, setIsWhyRequiredOpen] = useState(false);
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
      try {
        await Auth.signUp({
          username: storeFields.email,
          password: fields.password,
          attributes: {
            'custom:incentive_token': storeFields.referralCode || '',
          },
          autoSignIn: {
            enabled: true,
          },
        });

        return moveToNextStep();
      } catch (err) {
        const error = err as Error;

        if (error.name === 'UsernameExistsException') {
          await Auth.resendSignUp(storeFields.email);

          return moveToNextStep();
        }

        setError(error.message);
      }
    };

    const openWhyReqiredOnClick = () => setIsWhyRequiredOpen(!isWhyRequiredOpen);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Sign up to REINVEST"
          subtitle="Create a unique password for your account to continue."
        />

        {isWhyRequiredOpen && (
          <WhyRequiredBlackModal
            isOpen={isWhyRequiredOpen}
            onOpenChange={openWhyReqiredOnClick}
          />
        )}

        {error && <FormMessage message={error} />}

        <InputPassword
          name="password"
          control={control}
          required
        />

        <InputPassword
          name="passwordConfirmation"
          control={control}
          required
        />

        <WhyRequiredLink onClick={openWhyReqiredOnClick} />

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
