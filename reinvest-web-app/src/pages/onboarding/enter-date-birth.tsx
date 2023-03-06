import { BlackModal } from 'components/BlackModal';
import { InputBirthDate } from 'components/FormElements/InputBirthDate';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { OpenModalLink } from '../../components/Links/OpenModalLink';

const EnterDateBirthPage: NextPage = () => {
  const form = useForm<{ date: Date }>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="Enter your date of birth" />

        <InputBirthDate
          name="date"
          control={form.control}
        />

        <OpenModalLink
          label="Required. Why?"
          onClick={() => {}}
        />
      </BlackModal>
    </MainLayout>
  );
};

export default EnterDateBirthPage;
