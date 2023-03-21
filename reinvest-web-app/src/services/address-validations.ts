import { AsyncSelectOption } from 'components/FormElements/SelectAsync';
import { Address } from 'types/graphql';

export type AddressAsOption = AsyncSelectOption<Address>;

export const formatAddressOptionLabel = ({ addressLine1, city, state, label }: AddressAsOption, inputValue?: string) => {
  const hasRequiredFields = !!addressLine1 && !!city && !!state;
  const hasLabel = !!label;

  if (hasRequiredFields) {
    return `${addressLine1} ${city}, ${state}`;
  }

  if (!hasRequiredFields && hasLabel) {
    return label;
  }

  return inputValue || '';
};

// TO-DO: Replace with actual address validation service
export const getAddresses = async (inputValue: string) => {
  const addresses: Address[] = [
    {
      addressLine1: '461 Dean Street',
      addressLine2: 'Apt 1',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11217',
    },
    {
      addressLine1: '461 West 34th Street',
      addressLine2: '',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    {
      addressLine1: '4610 Center Boulevard',
      addressLine2: '',
      city: 'Long Island City',
      state: 'NY',
      zip: '11109',
    },
    {
      addressLine1: '4612 Glenwood Road',
      addressLine2: '',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11210',
    },
    {
      addressLine1: '4617 7th Avenue',
      addressLine2: '',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11220',
    },
  ];

  const addressesAsOptions: AddressAsOption[] = addresses
    .map(address => ({
      label: '',
      value: address.addressLine1 || '',
      ...address,
    }))
    .map(address => ({ ...address, label: formatAddressOptionLabel(address) }));

  return new Promise<AddressAsOption[]>(resolve => {
    setTimeout(() => {
      resolve(addressesAsOptions.filter(address => address.value.toLowerCase().includes(inputValue.toLowerCase())));
    }, 1000);
  });
};
