import { BlackModal } from 'components/BlackModal';
import { InputPhoneNumber } from 'components/FormElements/InputPhoneNumber';
import { WhyRequiredLink } from 'components/Links/WhyRequiredLink';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const EnterPhoneNumberPage: NextPage = () => {
  const form = useForm<{ phone: string }>();
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

        <InputPhoneNumber
          name="phone"
          control={form.control}
        />

        <WhyRequiredLink />
      </BlackModal>
    </MainLayout>
  );
};

export default EnterPhoneNumberPage;
