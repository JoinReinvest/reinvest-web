import { individualDraftAccountFields, profileFields } from 'constants/individualOnboardingFields';
import { isEmptyObject } from 'utils/isEmptyObject';
import { OnboardingFormFields } from 'views/onboarding/form-flow/form-fields';

import { useCompleteIndividualDraftAccount } from './queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from './queries/completeProfileDetails';
import { useCreateDraftAccount } from './queries/createDraftAccount';
import { useSetPhoneNumber } from './queries/setPhoneNumber';
const getObjecyByKeys = (keys: string[], fields: Map<string, any>) => {
  return keys.reduce((o, key) => {
    const data = fields.get(key);

    if (!data) return o;

    return Object.assign(o, { [key]: data });
  }, {});
};

export const useUpdateDataIndividualOnboarding = (storedFields: OnboardingFormFields) => {
  const {
    data: createDraftAccountData,
    error: createDraftAccountError,
    isLoading: isCreateDraftAccountLoading,
    mutate: createDraftAccountMutate,
    isSuccess: isCreateDraftAccountSuccess,
  } = useCreateDraftAccount();

  const {
    data: profileDetailsData,
    error: profileDetailsError,
    isLoading: isProfileDetailsLoading,
    mutate: completeProfileMutate,
    isSuccess: isProfileDetailsSuccess,
  } = useCompleteProfileDetails();

  const {
    data: individualDraftAccoutntData,
    error: individualDraftAccountError,
    isLoading: isIndividualDraftAccountLoading,
    mutate: completeIndividualDraftAccountMutate,
  } = useCompleteIndividualDraftAccount();

  const {
    data: phoneNumberData,
    error: phoneNumberError,
    isLoading: isPhoneNumberLoading,
    mutate: setPhoneNumberMutate,
    isSuccess: isSetPhoneNumberSuccess,
  } = useSetPhoneNumber();

  const updateData = () => {
    const storedFieldsMap = new Map<string, any>(Object.entries(storedFields));

    const profileDetails = getObjecyByKeys(profileFields, storedFieldsMap);
    const individualDraftAccount = getObjecyByKeys(individualDraftAccountFields, storedFieldsMap);

    if (storedFields.accountType) {
      createDraftAccountMutate(storedFields.accountType);
    }

    if (storedFields.phone?.countryCode && storedFields.phone?.number) {
      setPhoneNumberMutate({ countryCode: storedFields.phone.countryCode, phoneNumber: storedFields.phone.number });
    }

    if (!isEmptyObject(profileDetails)) {
      completeProfileMutate(profileDetails);
    }

    if (!isEmptyObject(individualDraftAccount)) {
      completeIndividualDraftAccountMutate(individualDraftAccount);
    }
  };

  return {
    data: { ...profileDetailsData, ...individualDraftAccoutntData, ...createDraftAccountData, phoneNumberData },
    error: { profileDetailsError, individualDraftAccountError, createDraftAccountError, phoneNumberError },
    isLoading: isProfileDetailsLoading || isIndividualDraftAccountLoading || isCreateDraftAccountLoading || isPhoneNumberLoading,
    isSuccess: isCreateDraftAccountSuccess || isSetPhoneNumberSuccess || isProfileDetailsSuccess,
    updateData: updateData,
  };
};
