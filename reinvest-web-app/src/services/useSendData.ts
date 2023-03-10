import { individualDraftAccountFields, profileFields } from 'constants/individualOnboardingFields';
import { isEmptyObject } from 'utils/isEmptyObject';
import { OnboardingFormFields } from 'views/onboarding/form-fields';

import { useCompleteIndividualDraftAccount } from './queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from './queries/completeProfileDetails';
import { useCreateDraftAccount } from './queries/createDraftAccount';
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
  } = useCreateDraftAccount();

  const {
    data: profileDetailsData,
    error: profileDetailsError,
    isLoading: isProfileDetailsLoading,
    mutate: completeProfileMutate,
  } = useCompleteProfileDetails();

  const {
    data: individualDraftAccoutntData,
    error: individualDraftAccountError,
    isLoading: isIndividualDraftAccountLoading,
    mutate: completeIndividualDraftAccountMutate,
  } = useCompleteIndividualDraftAccount();

  const updateData = () => {
    const storedFieldsMap = new Map<string, any>(Object.entries(storedFields));

    const profileDetails = getObjecyByKeys(profileFields, storedFieldsMap);
    const individualDraftAccount = getObjecyByKeys(individualDraftAccountFields, storedFieldsMap);

    if (storedFields.accountType) {
      createDraftAccountMutate(storedFields.accountType);
    }

    if (!isEmptyObject(profileDetails)) {
      completeProfileMutate(profileDetails);
    }

    if (!isEmptyObject(individualDraftAccount)) {
      completeIndividualDraftAccountMutate(individualDraftAccount);
    }
  };

  return {
    data: { ...profileDetailsData, ...individualDraftAccoutntData, ...createDraftAccountData },
    error: { profileDetailsError, individualDraftAccountError, createDraftAccountError },
    isLoading: isProfileDetailsLoading || isIndividualDraftAccountLoading || isCreateDraftAccountLoading,
    updateData: updateData,
  };
};
