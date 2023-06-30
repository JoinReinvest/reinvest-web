import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { InputZipCode } from 'components/FormElements/InputZipCode';
import { SelectAsync } from 'components/FormElements/SelectAsync';
import { ModalTitle } from 'components/ModalElements/Title';
import { Select } from 'components/Select';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Address } from 'reinvest-app-common/src/types/graphql';
import { AddressAsOption, addressService, loadAddressesSuggestions } from 'services/addresses';
import { makeRequest } from 'services/api-request';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Exclude<Address, null>;

export const StepPermanentAddress: StepParams<FlowFields> = {
  identifier: Identifiers.PERMANENT_ADDRESS,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateProfileDetails;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const [isLoadingSelectedAddress, setIsLoadingSelectedAddress] = useState(false);
    const initialValues: Fields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'USA' };
    const defaultValues: Fields =
      {
        addressLine1: storeFields?._address?.addressLine1 || '',
        addressLine2: storeFields?._address?.addressLine2 || '',
        city: storeFields?._address?.city || 'USA',
        country: storeFields?._address?.country || '',
        state: storeFields?._address?.state || '',
        zip: storeFields?._address?.zip || '',
      } || initialValues;

    const { control, formState, setValue, handleSubmit, setFocus } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(formValidationRules.address),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeLoading = isLoadingSelectedAddress;
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || shouldButtonBeLoading;

    const setValuesFromStreetAddress = async (option: AddressAsOption | null) => {
      const placeId = option?.placeId;

      if (placeId) {
        setIsLoadingSelectedAddress(true);
        const url = `/api/address/details/${placeId}`;
        const { data } = await makeRequest<Address>({ url });
        const address: Address = typeof data === 'string' ? JSON.parse(data) : {};

        setValue('addressLine1', address.addressLine1);
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('zip', address.zip);
        setValue('country', address.country);

        setIsLoadingSelectedAddress(false);
        setFocus('addressLine2');
      }
    };

    const onSubmit: SubmitHandler<Fields> = async address => {
      await updateStoreFields({ _address: { ...address, country: 'USA' } });

      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title="What is your permanent address?"
            informationMessage="US Residents Only"
          />

          <div className="flex w-full flex-col gap-16">
            <SelectAsync
              name="addressLine1"
              control={control}
              loadOptions={loadAddressesSuggestions}
              placeholder="Street Address or P.O. Box"
              formatOptionsLabel={(option, meta) => addressService.getFormattedAddressLabels(option, meta.inputValue)}
              formatSelectedOptionLabel={option => option.label}
              onOptionSelected={setValuesFromStreetAddress}
            />

            <Input
              name="addressLine2"
              control={control}
              placeholder="Unit No. (Optional)"
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
              name="zip"
              control={control}
              defaultValue={storeFields?._address?.zip}
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={shouldButtonBeLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
