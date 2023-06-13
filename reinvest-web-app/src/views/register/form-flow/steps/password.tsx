import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { PasswordChecklist } from 'components/Checklist/Password';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputPassword } from 'components/FormElements/InputPassword';
import { ModalTitle } from 'components/ModalElements/Title';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Schema } from 'zod';

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
    const schema: Schema<Fields> = formValidationRules.confirmationPassword;

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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
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
              placeholder="Repeat Password"
            />

            <PasswordChecklist
              password={fields.password}
              passwordConfirmation={fields.passwordConfirmation}
            />
          </div>
        </FormContent>

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
