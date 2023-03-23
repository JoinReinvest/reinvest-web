import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputEmail } from 'components/FormElements/InputEmail';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import zod, { Schema } from 'zod';

import { ForgotPasswordFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<ForgotPasswordFormFields, 'email'>;

export const StepEmail: StepParams<ForgotPasswordFormFields> = {
  identifier: Identifiers.EMAIL,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<ForgotPasswordFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      email: formValidationRules.email,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      setIsLoading(true);
      updateStoreFields(fields);

      try {
        await Auth.forgotPassword(fields.email);

        moveToNextStep();
      } catch (err) {
        setError(err as string);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle
            title="Reset Password"
            subtitle="Enter the email associated with your account and we’ll send an email with instructions to reset your password."
          />

          <div className="flex w-full flex-col gap-16">
            {error && <FormMessage message={error} />}

            <InputEmail
              control={control}
              name="email"
              required
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
