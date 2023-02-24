import { BlackModal } from 'components/BlackModal';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { PhoneInput } from '../../components/FormElements/PhoneInput';
import { WhyRequiredLink } from '../../components/Links/WhyRequiredLink';

const EnterPhoneNumberPage: NextPage = () => {
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
        <PhoneInput />
        <WhyRequiredLink href="/" />
      </BlackModal>
    </MainLayout>
  );
};

export default EnterPhoneNumberPage;
