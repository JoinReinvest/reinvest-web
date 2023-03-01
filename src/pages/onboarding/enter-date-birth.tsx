import { BlackModal } from 'components/BlackModal';
import { InputBirthDate } from 'components/FormElements/InputBirthDate';
import { WhyRequiredLink } from 'components/Links/WhyRequiredLink';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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

        <WhyRequiredLink />
        
      </BlackModal>
    </MainLayout>
  );
};

export default EnterDateBirthPage;
