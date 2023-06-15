import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { GetHelpLink } from 'components/Links/GetHelp';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { ModalTitle } from 'components/ModalElements/Title';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import zod, { Schema } from 'zod';

import { useAuth } from '../../../../../providers/AuthProvider';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

type Fields = Pick<FlowFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.AUTHENTICATION_CODE,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.newEmail];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });
    const { actions } = useAuth();
    const [error, setError] = useState<string | undefined>('');
    const [infoMessage, setInfoMessage] = useState('');

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const subtitleMessage = useMemo(() => `Enter the email authentication code sent to your email ${storeFields.newEmail}.`, [storeFields.newEmail]);

    const onSubmit: SubmitHandler<Fields> = async ({ authenticationCode }) => {
      const result = await actions.verifyEmail(authenticationCode, storeFields.newEmail);

      if (result === 'SUCCESS') {
        await updateStoreFields({ authenticationCode, _hasSucceded: true });
        moveToNextStep();
      }
    };

    const resendCodeOnClick = async () => {
      try {
        await Auth.resendSignUp(storeFields.newEmail);
        setInfoMessage('Code has been sent');
      } catch (err) {
        setError((err as Error).message);
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
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

          <div className="flex w-full flex-col gap-32">
            <InputAuthenticationCode
              name="authenticationCode"
              control={control}
              required
            />

            <div className="flex justify-between">
              <OpenModalLink
                label="Resend code"
                green
                onClick={resendCodeOnClick}
              />
              <GetHelpLink />
            </div>
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
