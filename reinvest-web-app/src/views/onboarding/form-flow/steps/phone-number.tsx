import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputPhoneNumber } from 'components/FormElements/InputPhoneNumber';
import { InputPhoneNumberCountryCode } from 'components/FormElements/InputPhoneNumberCountryCode';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { CALLING_CODES } from 'constants/country-codes';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { WhyRequiredPhoneNumberModal } from 'views/whyRequiredModals/WhyRequiredPhoneNumberModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'phone'>;

const schema = z.object({
  phone: z.object({
    countryCode: z.enum(CALLING_CODES),
    number: z.string(),
  }),
});

export const StepPhoneNumber: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PHONE_NUMBER,

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const form = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { control, handleSubmit, getValues } = form;
    const {
      isLoading,
      updateData,
      error: { phoneNumberError },
      data: { phoneNumberData },
    } = useUpdateDataIndividualOnboarding({
      ...getValues(),
      ...storeFields,
    });

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting || isLoading;

    const onMoreInformationClick = () => {
      setIsInformationModalOpen(true);
    };

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      updateData();
    };

    useEffect(() => {
      if (phoneNumberData) {
        moveToNextStep();
      }
    }, [phoneNumberData, moveToNextStep]);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title
            title="Enter your phone number"
            subtitle="We’ll text you a confirmation code within 10 minutes."
          />

          {phoneNumberError && <FormMessage message={phoneNumberError.message} />}

          <div className="flex">
            <div className="child:basis-2/5 contents">
              <InputPhoneNumberCountryCode
                name="phone.countryCode"
                control={control}
                defaultValue="1"
              />
            </div>

            <div className="contents">
              <InputPhoneNumber
                name="phone.number"
                control={control}
              />
            </div>
          </div>

          <OpenModalLink
            label="Required. Why?"
            onClick={onMoreInformationClick}
            green
          />

          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </Form>

        <WhyRequiredPhoneNumberModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
