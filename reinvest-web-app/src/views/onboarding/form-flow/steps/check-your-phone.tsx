import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { GetHelpLink } from 'components/Links/GetHelp';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import zod, { Schema } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'authCode'>;

export const StepCheckYourPhone: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CHECK_YOUR_PHONE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      authCode: formValidationRules.authenticationCode,
    });

    const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);

    const { handleSubmit, control, formState, getValues } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const { data, error, isLoading, updateData, isSuccess } = useUpdateDataIndividualOnboarding({
      ...getValues(),
      ...storeFields,
    });

    const onSubmit: SubmitHandler<Fields> = async fields => {
      setIsValidatingCredentials(true);
      updateStoreFields(fields);
      updateData();
      moveToNextStep();
    };

    const resendCodeOnClick = async () => {
      console.log('resend code clicked');
    };

    // useEffect(() => {
    //   if (isSuccess) {
    //     moveToNextStep();
    //   }
    // }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Check Your Phone"
          subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
        />

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
