import { BlackModal } from 'components/BlackModal';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { Select } from 'components/Select';
import { Title } from 'components/Title';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const GreenCardDetailsPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [citizenshipCountry, setCitizenshipCountry] = useState<string | undefined>('');
  const [birthCountry, setBirthCountry] = useState<string | undefined>('');

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const options = [
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

  return (
    <BlackModal isOpen={isOpen}>
      <Title title="Please enter your US Green Card details." />
      <WarningMessage message="US Residents Only" />
      <Select
        name="citizenship_country"
        options={options}
        placeholder="Citizenship Country"
        onChange={citizenCountry => setCitizenshipCountry(citizenCountry?.value)}
        value={citizenshipCountry}
      />
      <Select
        name="birth_country"
        options={options}
        placeholder="Birth Country"
        onChange={birthCountry => setBirthCountry(birthCountry?.value)}
        value={birthCountry}
      />
    </BlackModal>
  );
};

export default GreenCardDetailsPage;
