import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { BlackModal } from '../../components/BlackModal';
import { CircleSuccess } from '../../components/CircleSuccess';
import { Title } from '../../components/Title';
import { MainLayout } from '../../layouts/MainLayout';

const ConfirmationPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <CircleSuccess />

        <Title title="Your password has successfully been reset." />
      </BlackModal>
    </MainLayout>
  );
};

export default ConfirmationPage;
