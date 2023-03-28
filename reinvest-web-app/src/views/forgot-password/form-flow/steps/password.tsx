import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputPassword } from 'components/FormElements/InputPassword';
import { PasswordChecklist } from 'components/PasswordChecklist';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import zod, { Schema } from 'zod';

import { ForgotPasswordFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

interface Fields extends Pick<ForgotPasswordFormFields, 'password'> {
  passwordConfirmation: string;
}

export const StepPassword: StepParams<ForgotPasswordFormFields> = {
  identifier: Identifiers.PASSWORD,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.authenticationCode];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<ForgotPasswordFormFields>) => {
    const schema: Schema<Fields> = zod
      .object({
        password: formValidationRules.password,
        passwordConfirmation: formValidationRules.confirm_password,
      })
      .refine(data => data.password === data.passwordConfirmation, { message: 'Passwords do not match', path: ['passwordConfirmation'] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { handleSubmit, control, watch, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const fields = {
      password: watch('password'),
      passwordConfirmation: watch('passwordConfirmation'),
    };

    const onSubmit: SubmitHandler<Fields> = async fields => {
      updateStoreFields(fields);
      setIsLoading(true);

      try {
        await Auth.forgotPasswordSubmit(storeFields.email, storeFields.authenticationCode, fields.password);

        moveToNextStep();
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="!gap-60"
      >
        <FormContent>
          <BlackModalTitle
            title="Create new password"
            subtitle="Your new password must be different from previous used passwords."
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
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Change Password"
            disabled={shouldButtonBeDisabled}
            loading={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
