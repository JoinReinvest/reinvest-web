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
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import zod from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'phoneNumberAuthenticationCode'>;

const schema = zod.object({
  phoneNumberAuthenticationCode: formValidationRules.authenticationCode,
});

export const StepPhoneAuthentication: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PHONE_AUTHENTICATION,

  doesMeetConditionFields: fields => {
    return allRequiredFieldsExists([fields.accountType, fields.phoneNumber]);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const error = '';
    const infoMessage = '';
    const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);

    const defaultValues: Fields = { phoneNumberAuthenticationCode: storeFields.phoneNumberAuthenticationCode || '' };
    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ phoneNumberAuthenticationCode }) => {
      try {
        setIsValidatingCredentials(true);

        await updateStoreFields({ phoneNumberAuthenticationCode, _hasAuthenticatedPhoneNumber: true });

        setIsValidatingCredentials(false);
        moveToNextStep();
      } catch (error) {
        setIsValidatingCredentials(false);
        await updateStoreFields({ _hasAuthenticatedPhoneNumber: false });
      }
    };

    const resendCodeOnClick = async () => {
      // TO-DO: Implement resend code logic
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle
            title="Check Your Phone."
            subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
          />

          <div className="flex w-full flex-col gap-32">
            {error && <FormMessage message={error} />}

            {infoMessage && (
              <FormMessage
                message={infoMessage}
                variant="info"
              />
            )}

            <InputAuthenticationCode
              name="phoneNumberAuthenticationCode"
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
