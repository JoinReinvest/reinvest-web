import { BlackModal } from 'components/BlackModal';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { ZipCodeInput } from 'components/FormElements/ZipCodeInput';
import { Select } from 'components/Select';
import { Typography } from 'components/Typography';
import { STATES_AS_SELECT_OPTION } from 'constants/states';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '../../components/FormElements/Input';

interface FormFields {
  city: string;
  state: string | undefined;
  street: string | undefined;
  street2: string;
  zipCode: string;
}

const OnboardingAddressPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormFields>();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <BlackModal isOpen={isOpen}>
      <div className="flex flex-col gap-36">
        <div className="flex flex-col gap-16">
          <Typography variant="h5">Enter your permanent address</Typography>

          <WarningMessage message="US Residents Only" />
        </div>

        <div className="flex flex-col gap-16">
          <Select
            name="street"
            options={[]}
            control={form.control}
            placeholder="Street Address or P.O. Box"
            icon="search"
          />

          <Input
            name="street2"
            control={form.control}
            placeholder="Apt, suite, unit, building, floor, etc"
          />

          <Input
            name="city"
            control={form.control}
            placeholder="City"
          />

          <Select
            name="state"
            control={form.control}
            options={STATES_AS_SELECT_OPTION}
            placeholder="State"
          />

          <ZipCodeInput />
        </div>
      </div>
    </BlackModal>
  );
};

export default OnboardingAddressPage;
