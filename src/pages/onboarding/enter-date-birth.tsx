import { BlackModal } from 'components/BlackModal';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { BirthDateInput } from '../../components/FormElements/BirthDateInput';
import { WhyRequiredLink } from '../../components/Links/WhyRequiredLink';

const EnterDateBirthPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="Enter your date of birth" />
        <BirthDateInput />
        <WhyRequiredLink href="/" />
      </BlackModal>
    </MainLayout>
  );
};

export default EnterDateBirthPage;
