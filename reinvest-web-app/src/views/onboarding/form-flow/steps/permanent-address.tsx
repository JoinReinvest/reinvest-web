import { zodResolver } from '@hookform/resolvers/zod';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { Input } from 'components/FormElements/Input';
import { InputZipCode } from 'components/FormElements/InputZipCode';
import { SelectAsync } from 'components/FormElements/SelectAsync';
import { Select } from 'components/Select';
import { Title } from 'components/Title';
import { STATES_AS_SELECT_OPTION } from 'constants/states';
import { formValidationRules } from 'formValidationRules';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddressAsOption, formatAddressOptionLabel, getAddresses } from 'services/address-validations';
import { StepComponentProps, StepParams } from 'services/form-flow';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Exclude<OnboardingFormFields['permanentAddress'], undefined>;

const schema = formValidationRules.address;

export const StepPermanentAddress: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PERMANENT_ADDRESS,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const initialValues: Fields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '' };
    const defaultValues: Fields = storeFields.permanentAddress || initialValues;

    const { control, formState, setValue, handleSubmit } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const formatSelectedAddress = (address: AddressAsOption) => {
      const hasStreetAddress = !!address.addressLine1;

      return hasStreetAddress ? address.addressLine1 : address.label;
    };

    const setValuesFromStreetAddress = (address: AddressAsOption | null) => {
      if (address) {
        setValue('city', address.city || '');
        setValue('state', address.state || '');
        setValue('zip', address.zip || '');
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
