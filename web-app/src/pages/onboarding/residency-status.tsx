import { BlackModal } from 'components/BlackModal';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { RadioGroupOptions } from 'components/RadioGroupOptions';
import { RadioGroupOption } from 'components/RadioGroupOptions/interfaces';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const citizens: RadioGroupOption[] = [
  {
    value: 'us',
    title: 'US Citizen',
  },
  {
    value: 'green-card',
    title: 'Green Card',
  },
  {
    value: 'visa',
    title: 'Visa',
  },
];

const ResidencyStatusPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title
          title="Residency Status"
          subtitle="Please select your US residency status."
        />
        <WarningMessage message="REINVEST does not accept non-US residents at this time." />
        <RadioGroupOptions options={citizens} />
      </BlackModal>
    </MainLayout>
  );
};

export default ResidencyStatusPage;
