import { BlackModal } from 'components/BlackModal';
import { InputPhoneNumber } from 'components/FormElements/InputPhoneNumber';
import { InputPhoneNumberCountryCode } from 'components/FormElements/InputPhoneNumberCountryCode';
import { WhyRequiredLink } from 'components/Links/WhyRequiredLink';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const OnboardingPhoneNumberPage: NextPage = () => {
  const form = useForm<{ countryCode: string; phone: string }>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
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

        <WhyRequiredLink />
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingPhoneNumberPage;
