import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputPhoneNumber } from 'components/FormElements/InputPhoneNumber';
import { InputPhoneNumberCountryCode } from 'components/FormElements/InputPhoneNumberCountryCode';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CALLING_CODES } from 'reinvest-app-common/src/constants/country-codes';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import { getApiClient } from 'services/getApiClient';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { WhyRequiredPhoneNumberModal } from 'views/whyRequiredModals/WhyRequiredPhoneNumberModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'phone'>;

const schema = z.object({
  phone: z.object({
    countryCode: z.enum(CALLING_CODES),
    number: formValidationRules.phoneNumber,
  }),
});

export const StepPhoneNumber: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PHONE_NUMBER,

  willBePartOfTheFlow(fields) {
    return !fields.accountType && !fields.isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
    const { data: phoneNumberData, error: phoneNumberError, isLoading, mutate: setPhoneNumberMutate, isSuccess } = useSetPhoneNumber(getApiClient);

    const { control, handleSubmit, getValues, formState, setError } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { updateData } = useUpdateDataIndividualOnboarding();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;
    const phoneNumberErrorMessage = formState.errors?.phone?.number?.message;
    const errorMessage = formState.errors?.phone?.countryCode?.message || phoneNumberErrorMessage;

    const onMoreInformationClick = () => {
      setIsInformationModalOpen(true);
    };

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      await updateData(Identifiers.PHONE_NUMBER, {
        ...getValues(),
        ...storeFields,
      });

      const { phone } = fields;

      if (phone?.number && phone.countryCode) {
        setPhoneNumberMutate({ phoneNumber: phone.number, countryCode: phone.countryCode });
      }
    };

    useEffect(() => {
      if (phoneNumberData && isSuccess) {
        moveToNextStep();
      }
    }, [phoneNumberData, moveToNextStep, isSuccess]);

    useEffect(() => {
      setError('phone.countryCode', { message: phoneNumberErrorMessage });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phoneNumberErrorMessage]);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle
              title="Enter your phone number"
              subtitle="We'll text you a confirmation code within 10 minutes."
            />

            {phoneNumberError && <FormMessage message={phoneNumberError.message} />}

            <div className="flex w-full flex-col gap-16">
              <div className="flex flex-col gap-10">
                <div className="flex">
                  <div className="contents child:basis-2/5">
                    <InputPhoneNumberCountryCode
                      name="phone.countryCode"
                      control={control}
                      defaultValue={CALLING_CODES[0]}
                    />
                  </div>

                  <div className="contents">
                    <InputPhoneNumber
                      name="phone.number"
                      control={control}
                      willDisplayErrorMessage={false}
                    />
                  </div>
                </div>

                {errorMessage && <FormMessage message={errorMessage} />}
              </div>

              <OpenModalLink
                label="Required. Why?"
                onClick={onMoreInformationClick}
                green
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

        <WhyRequiredPhoneNumberModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
