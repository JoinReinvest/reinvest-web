import { CreatePasswordForm } from 'components/FormElements/CreatePasswordForm';
import { PasswordChecklist } from 'components/PasswordChecklist';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { BlackModal } from '../../components/BlackModal';
import { Title } from '../../components/Title';
import { MainLayout } from '../../layouts/MainLayout';

const CreatePasswordPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title
          title="Sign up to REINVEST"
          subtitle="Create a unique password for your account to continue."
        />

        <CreatePasswordForm />

        <PasswordChecklist
          password={'test'}
          passwordConfirmation={'test'}
        />
      </BlackModal>
    </MainLayout>
  );
};

export default CreatePasswordPage;
