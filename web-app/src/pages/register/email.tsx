import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { BlackModal } from '../../components/BlackModal';
import { EmailInput } from '../../components/FormElements/EmailInput';
import { Title } from '../../components/Title';
import { MainLayout } from '../../layouts/MainLayout';

const EmailPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title
          title="Reset Password"
          subtitle="Enter the email associated with your account and we’ll send an email with instructions to reset your password."
        />

        <EmailInput
          onChange={console.log}// eslint-disable-line
          value={'email@example.com'}
        />
      </BlackModal>
    </MainLayout>
  );
};

export default EmailPage;
