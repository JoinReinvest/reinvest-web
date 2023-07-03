import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
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
import { AccountType, Address, AddressInput } from 'reinvest-app-common/src/types/graphql';
import { AddressAsOption, addressService, loadAddressesSuggestions } from 'services/addresses';
import { makeRequest } from 'services/api-request';

import { useCorporateAccount } from '../../../../../hooks/corporate-account';
import { useTrustAccount } from '../../../../../hooks/trust-account';
import { useActiveAccount } from '../../../../ActiveAccountProvider';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

type Fields = AddressInput;

const TITLE = 'Enter your new business address.';
const BUTTON_LABEL = 'Confirm';

export const StepAddressFields: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.ADDRESS_FIELDS,

  doesMeetConditionFields: fields => {
    return !!fields?._currentAddress;
  },

  Component: ({ moveToNextStep, moveToPreviousStep, updateStoreFields, storeFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const { updateCorporateAccount, updateCorporateAccountMeta } = useCorporateAccount({
      accountId: activeAccount?.id ?? '',
      enabled: !!activeAccount?.id && activeAccount.type === AccountType.Corporate,
    });
    const { updateTrustAccount, updateTrustAccountMeta } = useTrustAccount({
      accountId: activeAccount?.id ?? '',
      enabled: !!activeAccount?.id && activeAccount.type === AccountType.Trust,
    });
    const { control, handleSubmit, setValue, formState, reset } = useForm<Fields>({ mode: 'onSubmit', resolver: zodResolver(formValidationRules.address) });
    const [isLoadingSelectedAddress, setIsLoadingSelectedAddress] = useState(false);

    async function maybeMoveToNextStep() {
      if (updateCorporateAccountMeta.isSuccess) {
        updateCorporateAccountMeta.reset();
      }

      if (updateTrustAccountMeta.isSuccess) {
        updateTrustAccountMeta.reset();
      }

      if (updateCorporateAccountMeta.isSuccess || updateTrustAccountMeta.isSuccess) {
        await updateStoreFields({ _hasSucceded: true });
        moveToNextStep();
      }
    }

    useEffect(() => {
      maybeMoveToNextStep();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateCorporateAccountMeta.isSuccess]);

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

    const onSubmit: SubmitHandler<Fields> = async fields => {
      // Mainly for keeping country as USA
      const currentAddress = storeFields._currentAddress;
      const address = currentAddress ? { ...currentAddress, ...fields } : fields;

      await updateStoreFields({ address });

      if (activeAccount?.type === AccountType.Corporate) {
        return updateCorporateAccount({ address });
      }

      return updateTrustAccount({ address });
    };

    function onButtonBackClick() {
      updateTrustAccountMeta.reset();
      updateCorporateAccountMeta.reset();
      reset();
      moveToPreviousStep();
    }

    const shouldButtonBeLoading = isLoadingSelectedAddress || updateCorporateAccountMeta.isLoading || updateTrustAccountMeta.isLoading;
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

          {updateCorporateAccountMeta.error && <ErrorMessagesHandler error={updateCorporateAccountMeta.error} />}
          {updateTrustAccountMeta.error && <ErrorMessagesHandler error={updateTrustAccountMeta.error} />}

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
