import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { InputZipCode } from 'components/FormElements/InputZipCode';
import { SelectAsync } from 'components/FormElements/SelectAsync';
import { Select } from 'components/Select';
import { Typography } from 'components/Typography';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Address, AddressInput } from 'reinvest-app-common/src/types/graphql';
import { AddressAsOption, addressService, loadAddressesSuggestions } from 'services/addresses';
import { makeRequest } from 'services/api-request';
import { useTimeout } from 'usehooks-ts';

import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

type Fields = AddressInput;

const TITLE = 'Enter your new address.';
const BUTTON_LABEL = 'Confirm';

export const StepAddressFields: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.ADDRESS_FIELDS,

  doesMeetConditionFields: fields => {
    return !!fields?._currentAddress;
  },

  Component: ({ moveToNextStep, moveToPreviousStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { control, handleSubmit, setValue, formState, reset } = useForm<Fields>({ mode: 'onSubmit', resolver: zodResolver(formValidationRules.address) });
    const [isLoadingSelectedAddress, setIsLoadingSelectedAddress] = useState(false);

    // TO-DO: Deprecate once the API for `updateProfile` is implemented.
    const [timeout, setTimeout] = useState<number | null>(null);
    const [apiStatus, setApiStatus] = useState('idle');

    useTimeout(() => {
      setApiStatus('success');
    }, timeout);

    useEffect(() => {
      async function checkApiStatus() {
        if (apiStatus === 'success') {
          await updateStoreFields({ _hasSucceded: true });
          moveToNextStep();
        }
      }

      checkApiStatus();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiStatus]);

    const setValuesFromStreetAddress = async (option: AddressAsOption | null) => {
      const placeId = option?.placeId;

      if (placeId) {
        setIsLoadingSelectedAddress(true);
        const url = `/api/address/details/${placeId}`;
        const { data } = await makeRequest<Address>({ url });
        const address: Address = typeof data === 'string' ? JSON.parse(data) : {};

        address?.addressLine1 && setValue('addressLine1', address.addressLine1);
        address?.city && setValue('city', address.city);
        address?.state && setValue('state', address.state);
        address?.zip && setValue('zip', address.zip);
        address?.country && setValue('country', address.country);

        setIsLoadingSelectedAddress(false);
      }
    };

    const onSubmit: SubmitHandler<Fields> = async address => {
      await updateStoreFields({ address });
      setApiStatus('loading');
      setTimeout(2000);
    };

    function onButtonBackClick() {
      reset();
      moveToPreviousStep();
    }

    // TO-DO: If the mutation is loading the button should be disabled as well
    const shouldButtonBeLoading = isLoadingSelectedAddress || apiStatus === 'loading';
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || shouldButtonBeLoading;
    const shouldBackButtonBeDisabled = formState.isSubmitting || shouldButtonBeLoading;

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldBackButtonBeDisabled}
          />

          <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>

          {/* TO-DO: use possible error from API call once it is available */}
          {/* {error && <ErrorMessagesHandler error={error} />} */}

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
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
            loading={shouldButtonBeLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
