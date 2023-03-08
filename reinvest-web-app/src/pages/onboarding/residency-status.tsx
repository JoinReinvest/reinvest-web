import { BlackModal } from 'components/BlackModal';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { RadioGroupOptionItem, RadioGroupOptions } from 'components/FormElements/RadioGroupOptions';
import { Title } from 'components/Title';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const citizens: RadioGroupOptionItem[] = [
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
  const form = useForm<{ selected: string }>();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <BlackModal isOpen={isOpen}>
      <Title
        title="Residency Status"
        subtitle="Please select your US residency status."
      />
      <WarningMessage message="REINVEST does not accept non-US residents at this time." />
      <RadioGroupOptions
        name="selected"
        control={form.control}
        options={citizens}
      />
    </BlackModal>
  );
};

export default ResidencyStatusPage;
