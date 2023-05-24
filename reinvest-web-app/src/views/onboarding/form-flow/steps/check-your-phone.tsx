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
import { Schema, z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'authCode'>;

const schema: Schema<Fields> = z.object({
  authCode: formValidationRules.authenticationCode,
});

export const StepCheckYourPhone: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CHECK_YOUR_PHONE,

  willBePartOfTheFlow(fields) {
    return !fields.accountType && !fields.isCompletedProfile && !fields._isPhoneCompleted;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName, fields.phone?.number, fields.phone?.countryCode];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile && !fields._isPhoneCompleted;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isInvalidVerificationCode, setIsInvalidVerificationCode] = useState(false);
    const { data, error: verifyPhoneNumberError, isLoading, isSuccess, mutate: verifyPhoneNumberMutate } = useVerifyPhoneNumber(getApiClient);
    const { mutateAsync: setPhoneNumberMutate, isSuccess: isSetPhoneNumberSuccess } = useSetPhoneNumber(getApiClient);

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const phoneNumber = storeFields.phone?.number;
    const maskedPhoneNumber = useMemo(() => {
      if (phoneNumber) {
        return maskPhoneNumber(phoneNumber);
      }

      return maskPhoneNumber('');
    }, [phoneNumber]);

    const onSubmit: SubmitHandler<Fields> = async ({ authCode }) => {
      setIsInvalidVerificationCode(false);
      await updateStoreFields({ authCode });
      const { phone } = storeFields;

      if (authCode && phone?.number && phone.countryCode) {
        await verifyPhoneNumberMutate({ authCode, countryCode: phone.countryCode, phoneNumber: phone.number });
      }
    };

    const resendCodeOnClick = async () => {
      if (storeFields.phone?.number && storeFields.phone?.countryCode) {
        await setPhoneNumberMutate({ phoneNumber: storeFields.phone.number, countryCode: storeFields.phone.countryCode });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        if (data) {
          updateStoreFields({ _isPhoneCompleted: true });

          return moveToNextStep();
        }

        return setIsInvalidVerificationCode(true);
      }
    }, [isSuccess, moveToNextStep, data, updateStoreFields]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title="Check Your Phone"
            subtitle={`Enter the SMS authentication code sent to your phone ${maskedPhoneNumber}.`}
          />

          {verifyPhoneNumberError && <ErrorMessagesHandler error={verifyPhoneNumberError} />}

          {isInvalidVerificationCode && <FormMessage message="Invalid Authentication Code" />}
          {isSetPhoneNumberSuccess && (
            <FormMessage
              message="Code resent"
              variant="info"
            />
          )}

          <div className="flex w-full flex-col gap-32">
            <InputAuthenticationCode
              name="authCode"
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
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
