import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputPassword } from 'components/FormElements/InputPassword';
import { PasswordChecklist } from 'components/PasswordChecklist';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { RegisterFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

interface Fields extends Pick<RegisterFormFields, 'password'> {
  passwordConfirmation: string;
}

export const StepPassword: StepParams<RegisterFormFields> = {
  identifier: Identifiers.PASSWORD,

  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const [error, setError] = useState<string | undefined>('');
    const schema: Schema<Fields> = zod
      .object({
        password: formValidationRules.password,
        passwordConfirmation: formValidationRules.confirm_password,
      })
      .refine(data => data.password === data.passwordConfirmation, { message: 'Passwords do not match', path: ['passwordConfirmation'] });

    const { handleSubmit, control, watch, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const fields = {
      password: watch('password'),
      passwordConfirmation: watch('passwordConfirmation'),
    };

    const onSubmit: SubmitHandler<Fields> = async fields => {
      setError(undefined);
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

        if (error.message.includes('WRONG_REFERRAL_CODE')) {
          error.message = 'Invalid referral code';
        }

        setError(error.message);
      }
    };

    return (
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="!gap-60"
      >
        <Title
          title="Sign up to REINVEST"
          subtitle="Create a unique password for your account to continue."
        />

        {error && <FormMessage message={error} />}

        <div className="flex w-full flex-col gap-16 lg:gap-24">
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

          <PasswordChecklist
            password={fields.password}
            passwordConfirmation={fields.passwordConfirmation}
          />
        </div>

        <ButtonStack>
          <Button
            type="submit"
            label="Sign Up"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
