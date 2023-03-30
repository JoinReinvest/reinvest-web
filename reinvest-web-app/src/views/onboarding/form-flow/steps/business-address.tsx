import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { InputZipCode } from 'components/FormElements/InputZipCode';
import { SelectAsync } from 'components/FormElements/SelectAsync';
import { Select } from 'components/Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { AddressAsOption, addressService } from 'services/addresses';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Exclude<OnboardingFormFields['businessAddress'], undefined>;

const schema = formValidationRules.address;

export const StepBusinessAddress: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.BUSINESS_ADDRESS,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const initialValues: Fields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'USA' };
    const defaultValues: Fields = storeFields.permanentAddress || initialValues;

    const { control, formState, setValue, handleSubmit, setFocus } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const setValuesFromStreetAddress = async (option: AddressAsOption | null) => {
      const placeId = option?.placeId;

      if (placeId) {
        const address = await addressService.getAddressFromPlaceId(placeId);

        setValue('addressLine1', address.addressLine1);
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('zip', address.zip);
        setValue('country', address.country);

        setFocus('addressLine2');
      }
    };

    const onSubmit: SubmitHandler<Fields> = async permanentAddress => {
      // TO-DO: Validate address using service
      await updateStoreFields({ permanentAddress });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle
            title="Enter the business address for your corporation."
            informationMessage="US Residents Only"
          />

          <div className="flex w-full flex-col gap-16">
            <SelectAsync
              name="addressLine1"
              control={control}
              loadOptions={addressService.getSuggestions}
              placeholder="Street Address or P.O. Box"
              formatOptionsLabel={(option, meta) => addressService.getFormattedAddressLabels(option, meta.inputValue)}
              formatSelectedOptionLabel={option => option.label}
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
          />
        </ButtonStack>
      </Form>
    );
  },
};
