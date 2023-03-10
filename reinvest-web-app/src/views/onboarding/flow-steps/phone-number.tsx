import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputPhoneNumber } from 'components/FormElements/InputPhoneNumber';
import { InputPhoneNumberCountryCode } from 'components/FormElements/InputPhoneNumberCountryCode';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { CALLING_CODES } from 'constants/country-codes';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { WhyRequiredPhoneNumberModal } from 'views/whyRequiredModals/WhyRequiredPhoneNumberModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

interface Fields {
  countryCode: string;
  phone: string;
}

const schema = z.object({
  countryCode: z.enum(CALLING_CODES),
});

export const StepPhoneNumber: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PHONE_NUMBER,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const phoneNumber = storeFields.phoneNumber;
    const { countryCode, phone } = useMemo(() => getPhoneNumberAndCountryCode(phoneNumber), [phoneNumber]);
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const form = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: { countryCode, phone },
    });

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting;

    const onMoreInformationClick = () => {
      setIsInformationModalOpen(true);
    };

    const onSubmit: SubmitHandler<Fields> = ({ countryCode, phone }) => {
      const phoneNumber = `${countryCode}${phone}`;
      updateStoreFields({ phoneNumber });
      moveToNextStep();
    };

    return (
      <>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Title
            title="Enter your phone number"
            subtitle="We’ll text you a confirmation code within 10 minutes."
          />

          <div className="flex">
            <div className="contents child:basis-2/5">
              <InputPhoneNumberCountryCode
                name="countryCode"
                control={form.control}
                defaultValue="1"
              />
            </div>

            <div className="contents">
              <InputPhoneNumber
                name="phone"
                control={form.control}
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

const getPhoneNumberAndCountryCode = (phoneNumber: string | undefined) => {
  if (phoneNumber) {
    const phoneNumberDigits = /\d{10}$/.exec(phoneNumber);

    if (phoneNumberDigits) {
      const { index } = phoneNumberDigits;

      return { countryCode: phoneNumber.slice(0, index), phone: phoneNumber.slice(index) };
    }
  }

  return { countryCode: '', phone: '' };
};
