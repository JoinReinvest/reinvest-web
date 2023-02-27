import { BlackModal } from 'components/BlackModal';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { Select } from 'components/Select';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const UsVisaDetailsPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [citizenshipCountry, setCitizenshipCountry] = useState<string | undefined>('');
  const [birthCountry, setBirthCountry] = useState<string | undefined>('');
  const [visaType, setVisaType] = useState<string | undefined>('');

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const countries = [
    {
      label: 'Country 1',
      value: 'country1',
    },
    {
      label: 'Country 2',
      value: 'country2',
    },
    {
      label: 'Country 3',
      value: 'country3',
    },
    {
      label: 'Country 4',
      value: 'country4',
    },
    {
      label: 'Country 5',
      value: 'country5',
    },
    {
      label: 'Country 6',
      value: 'country6',
    },
    {
      label: 'Country 7',
      value: 'country7',
    },
    {
      label: 'Country 8',
      value: 'country8',
    },
  ];

  const visaTypes = [
    {
      label: 'F-1',
      value: 'f1',
    },
    {
      label: 'H-1B',
      value: 'h1b',
    },
    {
      label: 'L-1',
      value: 'l1',
    },
    {
      label: 'O-1',
      value: 'o1',
    },
    {
      label: 'G-4',
      value: 'g4',
    },
  ];

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="Please enter your US Visa details." />
        <WarningMessage message="US Residents Only" />
        <Select
          name="citizenship_country"
          options={countries}
          placeholder="Citizenship Country"
          onChange={citizenCountry => setCitizenshipCountry(citizenCountry?.value)}
          value={citizenshipCountry}
        />
        <Select
          name="birth_country"
          options={countries}
          placeholder="Birth Country"
          onChange={birthCountry => setBirthCountry(birthCountry?.value)}
          value={birthCountry}
        />
        <Select
          name="visa_type"
          options={visaTypes}
          placeholder="Visa Type"
          onChange={viasType => setVisaType(viasType?.value)}
          value={visaType}
        />
      </BlackModal>
    </MainLayout>
  );
};

export default UsVisaDetailsPage;
