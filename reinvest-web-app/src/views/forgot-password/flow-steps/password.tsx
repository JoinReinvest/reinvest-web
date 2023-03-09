import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputPassword } from 'components/FormElements/InputPassword';
import { PasswordChecklist } from 'components/PasswordChecklist';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { OpenModalLink } from '../../../components/Links/OpenModalLink';
import { WhyRequiredPasswordModal } from '../../../components/WhyRequiredModals/WhyRequiredPasswordModal';
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
    const schema: Schema<Fields> = zod.object({
      password: formValidationRules.password,
      passwordConfirmation: formValidationRules.confirm_password,
    });
    const [isWhyRequiredOpen, setIsWhyRequiredOpen] = useState(false);
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

    const openWhyReqiredOnClick = () => setIsWhyRequiredOpen(!isWhyRequiredOpen);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Create new password"
          subtitle="Your new password must be different from previous used passwords."
        />

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

        <OpenModalLink
          label="Required. Why?"
          green
          onClick={openWhyReqiredOnClick}
        />

        <PasswordChecklist
          password={fields.password}
          passwordConfirmation={fields.passwordConfirmation}
        />

        <Button
          type="submit"
          label="Sign Up"
          disabled={shouldButtonBeDisabled}
          loading={isLoading}
        />

        {isWhyRequiredOpen && (
          <WhyRequiredPasswordModal
            isOpen={isWhyRequiredOpen}
            onOpenChange={openWhyReqiredOnClick}
          />
        )}
      </Form>
    );
  },
};
