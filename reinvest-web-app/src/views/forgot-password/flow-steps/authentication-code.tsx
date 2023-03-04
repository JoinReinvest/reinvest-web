import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { Title } from 'components/Title';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { GetHelpLink } from '../../../components/Links/GetHelp';
import { ResendCodeLink } from '../../../components/Links/ResendCodeLink';
import { formValidationRules } from '../../../formValidationRules';
import { ForgotPasswordFormFields } from '../form-fields';

type Fields = Pick<ForgotPasswordFormFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<ForgotPasswordFormFields> = {
  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<ForgotPasswordFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const [infoMessage, setInfoMessage] = useState('');
    const [error, setError] = useState('');
    const subtitleMessage = useMemo(() => `Enter the email authentication code sent to your email ${storeFields.email}.`, [storeFields.email]);

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    const resendCodeOnClick = async () => {
      try {
        await Auth.signIn(storeFields.email, storeFields.password);

        setInfoMessage('Code has been sent');
      } catch (err) {
        setError((err as Error).message);
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Check Your Email"
          subtitle={subtitleMessage}
        />

        {error && <FormMessage message={error} />}

        {infoMessage && (
          <FormMessage
            message={infoMessage}
            variant="info"
          />
        )}

        <InputAuthenticationCode
          name="authenticationCode"
          control={control}
          required
        />

        <div className="flex justify-between">
          <ResendCodeLink onClick={resendCodeOnClick} />
          <GetHelpLink />
        </div>

        <Button
          type="submit"
          label="Sign In"
          disabled={shouldButtonBeDisabled}
        />
      </Form>
    );
  },
};
