import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { GetHelpLink } from 'components/Links/GetHelp';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useVerifyPhoneNumber } from 'reinvest-app-common/src/services/queries/verifyPhoneNumber';
import { getApiClient } from 'services/getApiClient';
import { Schema, z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'authCode'>;

const schema: Schema<Fields> = z.object({
  authCode: formValidationRules.authenticationCode,
});

export const StepCheckYourPhone: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CHECK_YOUR_PHONE,

  willBePartOfTheFlow(fields) {
    return !fields.accountType && !fields.isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName, fields.phone?.number, fields.phone?.countryCode];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);
    const [isInvalidVerificationCode, setIsInvalidVerificationCode] = useState(false);
    const { data, error: verifyPhoneNumberError, isLoading, isSuccess, mutate: verifyPhoneNumberMutate } = useVerifyPhoneNumber(getApiClient);

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ authCode }) => {
      setIsInvalidVerificationCode(false);
      setIsValidatingCredentials(true);
      await updateStoreFields({ authCode });
      const { phone } = storeFields;

      if (authCode && phone?.number && phone.countryCode) {
        verifyPhoneNumberMutate({ authCode, countryCode: phone.countryCode, phoneNumber: phone.number });
      }
    };

    const resendCodeOnClick = async () => {
      return;
    };

    useEffect(() => {
      if (isSuccess) {
        return moveToNextStep();
      }
    }, [isSuccess, moveToNextStep, data]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle
            title="Check Your Phone"
            subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
          />

          {verifyPhoneNumberError && <FormMessage message={verifyPhoneNumberError.message} />}

          {isInvalidVerificationCode && <FormMessage message="Invalid Authentication Code" />}

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
            loading={isValidatingCredentials}
          />
        </ButtonStack>
      </Form>
    );
  },
};
