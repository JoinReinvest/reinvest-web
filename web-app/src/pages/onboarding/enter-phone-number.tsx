import { BlackModal } from 'components/BlackModal';
import { InputPhone } from 'components/FormElements/InputPhone';
import { WhyRequiredLink } from 'components/Links/WhyRequiredLink';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const EnterPhoneNumberPage: NextPage = () => {
  const form = useForm<{ phoneNumber: string }>();
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

        <InputPhone
          name="phoneNumber"
          control={form.control}
        />

        <WhyRequiredLink href="/" />
      </BlackModal>
    </MainLayout>
  );
};

export default EnterPhoneNumberPage;
