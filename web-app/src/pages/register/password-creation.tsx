import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { BlackModal } from '../../components/BlackModal';
import { PasswordInput } from '../../components/FormElements/PasswordInput';
import { WhyRequiredLink } from '../../components/Links/WhyRequiredLink';
import { PasswordChecklist } from '../../components/PasswordChecklist';
import { Title } from '../../components/Title';
import { MainLayout } from '../../layouts/MainLayout';

const PasswordCreationPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title
          title="Create new password"
          subtitle="Create a unique password for your account to continue."
        />

        <PasswordInput
          onChange={console.log} // eslint-disable-line
          value={'email@example.com'}
        />

        <WhyRequiredLink href="/" />

        <PasswordChecklist
          password={'test'}
          passwordConfirmation={'test'}
        />
      </BlackModal>
    </MainLayout>
  );
};

export default PasswordCreationPage;
