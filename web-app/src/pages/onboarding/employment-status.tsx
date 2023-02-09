import { BlackModal } from 'components/BlackModal';
import { SelectionCards } from 'components/SelectionCards';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { ComponentProps, useEffect, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <div className="flex flex-col max-lg:gap-60 lg:gap-36">
          <Typography
            variant="h5"
            className="lg:text-center"
          >
            Are you currently employed?
          </Typography>

          <SelectionCards
            name="employment-status"
            options={EMPLOYMENT_STATUS}
            required={false}
            orientation="vertical"
            className="flex flex-col items-stretch max-lg:gap-22 lg:gap-16"
          />
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingEmploymentStatusPage;
