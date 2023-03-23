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
import { STATES_AS_SELECT_OPTION } from 'constants/states';
import { formValidationRules } from 'formValidationRules';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddressAsOption, formatAddressOptionLabel, getAddresses } from 'services/address-validations';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { DraftAccountType } from 'types/graphql';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Exclude<OnboardingFormFields['address'], undefined>;

const schema = formValidationRules.address;

export const StepPermanentAddress: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PERMANENT_ADDRESS,

  doesMeetConditionFields(fields) {
    const requiredFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
      fields._didDocumentIdentificationValidationSucceed,
    ];

    const individualFields = [fields.socialSecurityNumber];

    return (
      (fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(requiredFields) && allRequiredFieldsExists(individualFields)) ||
      (fields.accountType !== DraftAccountType.Individual && allRequiredFieldsExists(requiredFields))
    );
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const initialValues: Fields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '' };
    const defaultValues: Fields = storeFields.address || initialValues;

    const { control, formState, setValue, handleSubmit } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const {
      isLoading,
      updateData,
      isSuccess,
      error: { profileDetailsError },
    } = useUpdateDataIndividualOnboarding();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const formatSelectedAddress = (address: AddressAsOption) => {
      const hasStreetAddress = !!address.addressLine1;

      return hasStreetAddress ? address.addressLine1 : address.label;
    };

    const setValuesFromStreetAddress = (address: AddressAsOption | null) => {
      if (address) {
        setValue('addressLine1', address.addressLine1);
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('zip', address.zip);
      }
    };

    const onSubmit: SubmitHandler<Fields> = async address => {
      await updateStoreFields({ address });
      updateData(Identifiers.PERMANENT_ADDRESS, { ...storeFields, address });
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
