import { BlackModal } from 'components/BlackModal';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { Select } from 'components/Select';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const GreenCardDetailsPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [citizenshipCountry, setCitizenshipCountry] = useState<string | undefined>('');

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const options = [
    {
      label: 'Test',
      value: 'test',
    },
    {
      label: 'Test1',
      value: 'test1',
    },
  ];

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="Please enter your US Green Card details. " />
        <WarningMessage message="US Residents Only" />
        <Select
          name="citizenship_country"
          options={options}
          placeholder="Citizenship Country"
          onChange={newValue => setCitizenshipCountry(newValue?.value)}
          value={citizenshipCountry}
        />
      </BlackModal>
    </MainLayout>
  );
};

export default GreenCardDetailsPage;
