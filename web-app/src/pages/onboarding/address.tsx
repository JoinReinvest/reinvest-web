import { BlackModal } from 'components/BlackModal';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { TextInput } from 'components/FormElements/TextInput';
import { ZipCodeInput } from 'components/FormElements/ZipCodeInput';
import { Select } from 'components/Select';
import { Typography } from 'components/Typography';
import { STATES_AS_SELECT_OPTION } from 'constants/states';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
    <MainLayout>
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
              placeholder="Street Address or P.O. Box"
              icon="search"
            />

            <TextInput
              name="street2"
              value=""
              control={form.control}
              placeholder="Apt, suite, unit, building, floor, etc"
            />

            <TextInput
              name="city"
              value=""
              control={form.control}
              placeholder="City"
            />

            <Select
              name="state"
              value={''}
              onChange={option => {
                form.setValue('state', option?.value);
              }}
              options={STATES_AS_SELECT_OPTION}
              placeholder="State"
            />

            <ZipCodeInput
              value={form.getValues('zipCode')}
              onChange={value => {
                form.setValue('zipCode', value);
              }}
            />
          </div>
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingAddressPage;
