import { zodResolver } from '@hookform/resolvers/zod';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { Input } from 'components/FormElements/Input';
import { InputZipCode } from 'components/FormElements/InputZipCode';
import { AsyncSelectOption, SelectAsync } from 'components/FormElements/SelectAsync';
import { Select } from 'components/Select';
import { Title } from 'components/Title';
import { STATES_AS_SELECT_OPTION } from 'constants/states';
import { formValidationRules } from 'formValidationRules';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';

import { Address, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Address;
type AddressAsOption = AsyncSelectOption<Address>;

const schema = formValidationRules.address;

export const StepPermanentAddress: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PERMANENT_ADDRESS,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const initialValues: Fields = { streetAddress: '', streetAddress2: '', city: '', state: '', zipCode: '' };
    const defaultValues: Fields = storeFields.permanentAddress || initialValues;

    const { control, formState, setValue, handleSubmit, watch } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const zipCode = watch('zipCode');

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const formatSelectedAddress = (address: AddressAsOption) => {
      const hasStreetAddress = !!address.streetAddress;

      return hasStreetAddress ? address.streetAddress : address.label;
    };

    const setValuesFromStreetAddress = (address: AddressAsOption | null) => {
      if (address) {
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('zipCode', address.zipCode);
      }
    };

    const onSubmit: SubmitHandler<Fields> = async permanentAddress => {
      // TO-DO: Validate address using service
      await updateStoreFields({ permanentAddress });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Title title="What is your permanent address?" />

          <WarningMessage message="US Residents Only" />
        </div>

        <div className="flex w-full flex-col gap-16">
          <SelectAsync
            name="streetAddress"
            control={control}
            loadOptions={getAddresses}
            placeholder="Street Address or P.O. Box"
            formatOptionsLabel={(option, meta) => formatOptionLabel(option, meta.inputValue)}
            formatSelectedOptionLabel={formatSelectedAddress}
            onOptionSelected={setValuesFromStreetAddress}
          />

          <Input
            name="streetAddress2"
            control={control}
            placeholder="Apt, suite, unit, building, floor, etc"
          />

          <Input
            name="city"
            control={control}
            placeholder="City"
          />

          <Select
            name="state"
            control={control}
            options={STATES_AS_SELECT_OPTION}
            placeholder="State"
          />

          <InputZipCode
            name="zipCode"
            defaultValue={zipCode}
            control={control}
            shouldUnregister
          />
        </div>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};

const formatOptionLabel = ({ streetAddress, city, state, label }: AddressAsOption, inputValue?: string) => {
  const hasRequiredFields = !!streetAddress && !!city && !!state;
  const hasLabel = !!label;

  if (hasRequiredFields) {
    return `${streetAddress} ${city}, ${state}`;
  }

  if (!hasRequiredFields && hasLabel) {
    return label;
  }

  return inputValue || '';
};

// TO-DO: Replace with service call
const getAddresses = async (inputValue: string) => {
  const addresses: Address[] = [
    {
      streetAddress: '461 Dean Street',
      streetAddress2: 'Apt 1',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11217',
    },
    {
      streetAddress: '461 West 34th Street',
      streetAddress2: '',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    {
      streetAddress: '4610 Center Boulevard',
      streetAddress2: '',
      city: 'Long Island City',
      state: 'NY',
      zipCode: '11109',
    },
    {
      streetAddress: '4612 Glenwood Road',
      streetAddress2: '',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11210',
    },
    {
      streetAddress: '4617 7th Avenue',
      streetAddress2: '',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11220',
    },
  ];

  const addressesAsOptions: AddressAsOption[] = addresses
    .map(address => ({
      label: '',
      value: address.streetAddress,
      ...address,
    }))
    .map(address => ({ ...address, label: formatOptionLabel(address) }));

  return new Promise<AddressAsOption[]>(resolve => {
    setTimeout(() => {
      resolve(addressesAsOptions.filter(address => address.value.toLowerCase().includes(inputValue.toLowerCase())));
    }, 1000);
  });
};
