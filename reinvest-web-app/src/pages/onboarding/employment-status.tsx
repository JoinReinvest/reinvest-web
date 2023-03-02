import { BlackModal } from 'components/BlackModal';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { ComponentProps, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Title } from '../../components/Title';

const EMPLOYMENT_STATUS: ComponentProps<typeof SelectionCards>['options'] = [
  {
    title: 'Employed',
    value: 'employed',
  },
  {
    title: 'Unemployed',
    value: 'unemployed',
  },
  {
    title: 'Retired',
    value: 'retired',
  },
  {
    title: 'Student',
    value: 'student',
  },
];

const OnboardingEmploymentStatusPage: NextPage = () => {
  const form = useForm<{ selection: string }>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="Are you currently employed?" />

        <SelectionCards
          name="selection"
          control={form.control}
          options={EMPLOYMENT_STATUS}
          required={false}
          orientation="vertical"
          className="flex flex-col items-stretch gap-22"
        />
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingEmploymentStatusPage;
