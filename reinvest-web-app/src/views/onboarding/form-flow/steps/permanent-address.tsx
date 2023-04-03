import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { Input } from 'components/FormElements/Input';
import { InputZipCode } from 'components/FormElements/InputZipCode';
import { SelectAsync } from 'components/FormElements/SelectAsync';
import { Select } from 'components/Select';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { AddressAsOption, formatAddressOptionLabel, getAddresses } from 'reinvest-app-common/src/services/addresses';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Exclude<OnboardingFormFields['address'], null>;

const schema = formValidationRules.address;

export const StepPermanentAddress: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PERMANENT_ADDRESS,

  willBePartOfTheFlow(fields) {
    return fields.accountType === DraftAccountType.Individual;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
    ];

    const individualFields = [fields.ssn];

    return (
      (fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(requiredFields) && allRequiredFieldsExists(individualFields)) ||
      (fields.accountType !== DraftAccountType.Individual && allRequiredFieldsExists(requiredFields))
    );
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const initialValues: Fields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'USA' };
    const defaultValues: Fields = storeFields.address || initialValues;

    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);
    const { control, formState, setValue, handleSubmit } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const formatSelectedAddress = (address: AddressAsOption) => {
      const hasStreetAddress = !!address.addressLine1;

      return hasStreetAddress ? address.addressLine1 : address.label;
    };

    const setValuesFromStreetAddress = (address: AddressAsOption | null) => {
      if (address?.addressLine1 && address?.city && address?.state && address?.zip) {
        setValue('addressLine1', address.addressLine1);
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('zip', address.zip);
      }
    };

    const onSubmit: SubmitHandler<Fields> = async address => {
      await updateStoreFields({ address });
      const { addressLine1, addressLine2, city, zip, state, country } = address;

      if (addressLine1 && city && country && state && zip) {
        await completeProfileMutate({ input: { address: { addressLine2, addressLine1, city, country, state, zip } } });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle
            title="What is your permanent address?"
            informationMessage="US Residents Only"
          />

          {profileDetailsError && <FormMessage message={profileDetailsError.message} />}
          <div className="flex w-full flex-col gap-16">
            <SelectAsync
              name="addressLine1"
              control={control}
              loadOptions={getAddresses}
              placeholder="Street Address or P.O. Box"
              formatOptionsLabel={(option, meta) => formatAddressOptionLabel(option, meta.inputValue)}
              formatSelectedOptionLabel={formatSelectedAddress}
              onOptionSelected={setValuesFromStreetAddress}
            />

            <Input
              name="addressLine2"
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
              name="zip"
              control={control}
              shouldUnregister
              defaultValue={storeFields.address?.zip}
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
