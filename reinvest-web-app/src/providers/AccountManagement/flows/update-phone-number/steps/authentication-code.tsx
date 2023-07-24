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
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import { useVerifyPhoneNumber } from 'reinvest-app-common/src/services/queries/verifyPhoneNumber';
import { getApiClient } from 'services/getApiClient';
import { maskPhoneNumber } from 'utils/phone-number';
import zod, { Schema } from 'zod';

import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const TITLE = 'Check Your Phone';
const BUTTON_LABEL = 'Confirm';

type Fields = Pick<FlowFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.AUTHENTICATION_CODE,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.phone?.number, fields.phone?.countryCode];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });
    const [error, setError] = useState<string | undefined>('');
    const [infoMessage, setInfoMessage] = useState('');
    const { mutateAsync: setPhoneNumberMutate, isLoading } = useSetPhoneNumber(getApiClient);
    const { mutateAsync: verifyPhoneNumber, ...verifyPhoneNumberMeta } = useVerifyPhoneNumber(getApiClient);

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading || verifyPhoneNumberMeta.isLoading;
    const phoneNumber = `${storeFields.phone.countryCode}${storeFields.phone?.number}`;
    const maskedPhoneNumber = useMemo(() => {
      if (phoneNumber) {
        return maskPhoneNumber(phoneNumber);
      }

      return maskPhoneNumber('');
    }, [phoneNumber]);

    const subtitleMessage = useMemo(() => `Enter the SMS authentication code sent to your phone ${maskedPhoneNumber}`, [maskedPhoneNumber]);

    const onSubmit: SubmitHandler<Fields> = async ({ authenticationCode }) => {
      await verifyPhoneNumber({ phoneNumber: storeFields.phone.number, countryCode: storeFields.phone.countryCode, authCode: authenticationCode });
      await updateStoreFields({ authenticationCode });
    };

    const resendCodeOnClick = async () => {
      try {
        await setPhoneNumberMutate({ phoneNumber: storeFields.phone.number, countryCode: storeFields.phone.countryCode });
        setInfoMessage('Code has been sent');
      } catch (err) {
        setError((err as Error).message);
      }
    };

    useEffect(() => {
      if (verifyPhoneNumberMeta.isSuccess) {
        updateStoreFields({ _hasSucceded: true });
        moveToNextStep();
      }
    }, [verifyPhoneNumberMeta.isSuccess, moveToNextStep, updateStoreFields]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ModalTitle
            title={TITLE}
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
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
