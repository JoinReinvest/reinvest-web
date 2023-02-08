import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';
import { BlackModal } from 'components/BlackModal';
import { Link } from 'components/Link';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useState } from 'react';

const EnterPhoneNumberPage: NextPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const phoneMask: InputMaskedProps['maskOptions'] = {
    mask: '+0 (000) 000-0000',
  };

  return (
    <MainLayout>
      <BlackModal
        isOpen={true}
        onOpenChange={() => {
          console.log(1); // eslint-disable-line
        }}
      >
        <Title
          title="Enter your phone number"
          subtitle="We’ll text you a confirmation code within 10 minutes."
        />
        <InputMasked
          maskOptions={phoneMask}
          name="phone_number"
          value={phoneNumber}
          onChange={updatedValue => setPhoneNumber(updatedValue)}
          placeholder="000-000-000"
        />
        <Link
          href="/"
          title="why required link"
        >
          Required. Why?
        </Link>
      </BlackModal>
    </MainLayout>
  );
};

export default EnterPhoneNumberPage;
