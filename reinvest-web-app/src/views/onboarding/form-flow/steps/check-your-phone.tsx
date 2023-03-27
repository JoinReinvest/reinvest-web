import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { GetHelpLink } from 'components/Links/GetHelp';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { Schema, z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'authCode'>;

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
    const schema: Schema<Fields> = z.object({
      authCode: formValidationRules.authenticationCode,
    });

    const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);

    const { handleSubmit, control, formState, getValues } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const {
      updateData,
      error: { verifyPhoneNumberError },
      data: { verifyPhoneNumberData },
    } = useUpdateDataIndividualOnboarding();

    const onSubmit: SubmitHandler<Fields> = async fields => {
      setIsValidatingCredentials(true);
      await updateStoreFields(fields);
      await updateData(Identifiers.CHECK_YOUR_PHONE, {
        ...getValues(),
        ...storeFields,
      });
    };

    const resendCodeOnClick = async () => {
      return;
    };

    useEffect(() => {
      if (verifyPhoneNumberData) {
        moveToNextStep();
      }
    }, [verifyPhoneNumberData, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Check Your Phone"
          subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
        />

        {verifyPhoneNumberError && <FormMessage message={verifyPhoneNumberError.message} />}

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
