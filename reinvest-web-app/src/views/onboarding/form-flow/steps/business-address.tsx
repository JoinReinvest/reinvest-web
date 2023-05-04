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
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { Address, AddressInput, DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { AddressAsOption, addressService, loadAddressesSuggestions } from 'services/addresses';
import { makeRequest } from 'services/api-request';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Exclude<OnboardingFormFields['businessAddress'], undefined>;

const schema = formValidationRules.address;

export const StepBusinessAddress: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.BUSINESS_ADDRESS,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate || accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const hasTrustFields = allRequiredFieldsExists([fields.trustType, fields.trustLegalName]) && fields.accountType === DraftAccountType.Trust;
    const hasCorporateFields =
      allRequiredFieldsExists([fields.corporationType, fields.corporationLegalName, fields.ein]) && fields.accountType === DraftAccountType.Corporate;

    return hasProfileFields && (hasTrustFields || hasCorporateFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const initialValues: Fields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'USA' };
    const defaultValues: Fields = storeFields.businessAddress || initialValues;
    const {
      mutateAsync: completeTrustDraftAccount,
      isSuccess: isTrustDraftAccountSuccess,
      error: trustDraftAccountError,
      isLoading: isTrustDraftAccountLoading,
    } = useCompleteTrustDraftAccount(getApiClient);
    const {
      mutateAsync: completeCorporateDraftAccount,
      isSuccess: isCorporateDraftAccountSuccess,
      error: corporateDraftAccountError,
      isLoading: isCorporateDraftAccountLoading,
    } = useCompleteCorporateDraftAccount(getApiClient);
    const { control, formState, setValue, handleSubmit, setFocus } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const [isLoadingSelectedAddress, setIsLoadingSelectedAddress] = useState(false);
    const shouldButtonBeLoading = isTrustDraftAccountLoading || isCorporateDraftAccountLoading;
    const shouldButtonBeDisabled = !formState.isValid || shouldButtonBeLoading || isLoadingSelectedAddress;

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

    const onSubmit: SubmitHandler<Fields> = async permanentAddress => {
      await updateStoreFields({ businessAddress: permanentAddress });
      const address = permanentAddress as AddressInput;
      const { accountId, accountType } = storeFields;

      if (accountId && permanentAddress.addressLine1 && permanentAddress.city && permanentAddress.state && permanentAddress.zip) {
        const variables = { accountId, input: { address: { ...address, country: 'USA' } } };

        if (accountType === DraftAccountType.Trust) {
          await completeTrustDraftAccount(variables);
        }

        if (accountType === DraftAccountType.Corporate) {
          await completeCorporateDraftAccount(variables);
        }
      }
    };

    const fiduciaryEntityTitle = storeFields.accountType === DraftAccountType.Corporate ? 'corporation' : 'trust';

    useEffect(() => {
      if (isTrustDraftAccountSuccess || isCorporateDraftAccountSuccess) {
        moveToNextStep();
      }
    }, [isTrustDraftAccountSuccess, isCorporateDraftAccountSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title={`Enter the business address for your ${fiduciaryEntityTitle}.`}
            informationMessage="US Residents Only"
          />
          {trustDraftAccountError && <ErrorMessagesHandler error={trustDraftAccountError} />}
          {corporateDraftAccountError && <ErrorMessagesHandler error={corporateDraftAccountError} />}
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
