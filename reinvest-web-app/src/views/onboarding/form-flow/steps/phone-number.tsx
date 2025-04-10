import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputPhoneNumber } from 'components/FormElements/InputPhoneNumber';
import { InputPhoneNumberCountryCode } from 'components/FormElements/InputPhoneNumberCountryCode';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { ModalTitle } from 'components/ModalElements/Title';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CALLING_CODES } from 'reinvest-app-common/src/constants/country-codes';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import { getApiClient } from 'services/getApiClient';
import { WhyRequiredPhoneNumberModal } from 'views/whyRequiredModals/WhyRequiredPhoneNumberModal';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
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

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile && !fields._isPhoneCompleted;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
    const { data: phoneNumberData, error: phoneNumberError, isLoading, mutate: setPhoneNumberMutate, isSuccess } = useSetPhoneNumber(getApiClient);

    const defaultValues: Fields = { phone: { countryCode: storeFields.phone?.countryCode || CALLING_CODES[0], number: storeFields.phone?.number || '' } };
    const { control, handleSubmit, formState, setError } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;
    const phoneNumberErrorMessage = formState.errors?.phone?.number?.message;
    const errorMessage = formState.errors?.phone?.countryCode?.message || phoneNumberErrorMessage;

    const onMoreInformationClick = () => {
      setIsInformationModalOpen(true);
    };

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);

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
            <ModalTitle
              title="Enter your phone number"
              subtitle="You are consenting to be contacted at this phone number for the purpose of receiving a verification code from Reinvest. Wireless and text message fees from your carrier may apply. See Privacy Policy below."
            />

            {phoneNumberError && <ErrorMessagesHandler error={phoneNumberError} />}

            <div className="flex w-full flex-col gap-16">
              <div className="flex flex-col gap-10">
                <div className="flex">
                  <div className="select-phone-number-country-code contents child:basis-2/5">
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
                      defaultValue={storeFields.phone?.number}
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
