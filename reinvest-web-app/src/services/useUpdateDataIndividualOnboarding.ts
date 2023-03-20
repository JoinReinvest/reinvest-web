import { individualDraftAccountFields, profileFields } from 'constants/individualOnboardingFields';
import { isEmptyObject } from 'utils/isEmptyObject';
import { OnboardingFormFields } from 'views/onboarding/form-flow/form-fields';
import { Identifiers } from 'views/onboarding/form-flow/identifiers';

import { fetcher } from './fetcher';
import { useCompleteIndividualDraftAccount } from './queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from './queries/completeProfileDetails';
import { useCreateDocumentsFileLinks } from './queries/createDocumentsFileLinks';
import { useCreateDraftAccount } from './queries/createDraftAccount';
import { useSetPhoneNumber } from './queries/setPhoneNumber';
import { useVerifyPhoneNumber } from './queries/verifyPhoneNumber';

const getObjecyByKeys = (keys: string[], fields: Map<string, any>) => {
  return keys.reduce<Record<string, any>>((o, key) => {
    const data = fields.get(key);

    if (!data) return o;

    return Object.assign(o, { [key]: data });
  }, {});
};

const profileDetailsSteps = [
  Identifiers.CHECK_YOUR_PHONE,
  Identifiers.PHONE_NUMBER,
  Identifiers.PROFILE_PICTURE,
  Identifiers.FULL_NAME,
  Identifiers.DATE_OF_BIRTH,
  Identifiers.RESIDENCY_STATUS,
  Identifiers.RESIDENCY_GREEN_CARD,
  Identifiers.RESIDENCY_VISA,
  Identifiers.COMPLIANCES,
  Identifiers.FINRA_INSTITUTION,
  Identifiers.EMPLOYMENT_STATUS,
  Identifiers.EMPLOYMENT_DETAILS,
  Identifiers.NET_WORTH_AND_INCOME,
  Identifiers.EXPERIENCE,
  Identifiers.IDENTIFICATION_DOCUMENTS,
  Identifiers.IDENTIFICATION_DOCUMENTS_VALIDATION,
  Identifiers.SOCIAL_SECURITY_NUMBER,
  Identifiers.SOCIAL_SECURITY_NUMBER_VALIDATION,
];

const createIndividualDraftAccountSteps = [Identifiers.ACCOUNT_TYPE];

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

  const {
    data: verifyPhoneNumberData,
    error: verifyPhoneNumberError,
    isLoading: isVerifyPhoneNumberLoading,
    mutate: verifyPhoneNumberMutate,
  } = useVerifyPhoneNumber();

  const {
    data: createDocumentsFileLinksData,
    error: createDocumentsFileLinksError,
    isLoading: isCreateDocumentsFileLinksLoading,
    // mutate: createDocumentsFileLinksMutate,
    isSuccess: isCreateDocumentsFileLinksSuccess,
    mutateAsync: createDocumentsFileLinksMutate,
  } = useCreateDocumentsFileLinks();

  const updateData = async (stepId: Identifiers) => {
    const storedFieldsMap = new Map<string, any>(Object.entries(storedFields));

    const profileDetails = getObjecyByKeys(profileFields, storedFieldsMap);
    const individualDraftAccount = getObjecyByKeys(individualDraftAccountFields, storedFieldsMap);

    if (storedFields.accountType && createIndividualDraftAccountSteps.includes(stepId)) {
      createDraftAccountMutate(storedFields.accountType);
    }

    if (storedFields.phone?.countryCode && storedFields.phone?.number) {
      setPhoneNumberMutate({ countryCode: storedFields.phone.countryCode, phoneNumber: storedFields.phone.number });
    }

    if (!isEmptyObject(profileDetails) && profileDetailsSteps.includes(stepId)) {
      const { residency, statementType, finraInstitutionName, socialSecurityNumber, experience } = storedFields;
      const domicile = residency ? { ...profileDetails.domicile, type: residency } : undefined;
      const statements = statementType && finraInstitutionName ? { type: statementType, forFINRA: { name: finraInstitutionName } } : undefined;
      const ssn = socialSecurityNumber ? { ssn: socialSecurityNumber } : undefined;
      const investingExperience = experience ? { experience: experience } : undefined;

      // send documents to s3
      if (storedFields.identificationDocument?.front && storedFields.identificationDocument?.back) {
        const documentsFileLinks = await createDocumentsFileLinksMutate({ numberOfLinks: 2 });

        const s3urls = documentsFileLinks?.map(documentFileLink => documentFileLink?.url) as string[];
        console.log('s3urls', s3urls);
        try {
          s3urls[0] ? await fetcher(s3urls[0], 'PUT', storedFields.identificationDocument.back) : null;
          s3urls[1] ? await fetcher(s3urls[1], 'PUT', storedFields.identificationDocument.front) : null;
        } catch (error) {
          console.log('error', error);
        }
      }

      completeProfileMutate({ ...profileDetails, domicile, statements, ssn, investingExperience });
    }

    if (!isEmptyObject(individualDraftAccount)) {
      completeIndividualDraftAccountMutate(individualDraftAccount);
    }

    if (storedFields.authCode && storedFields.phone.countryCode && storedFields.phone.number) {
      verifyPhoneNumberMutate({ authCode: storedFields.authCode, countryCode: storedFields.phone.countryCode, phoneNumber: storedFields.phone.number });
    }
  };

  return {
    data: {
      ...profileDetailsData,
      ...individualDraftAccoutntData,
      ...createDraftAccountData,
      phoneNumberData,
      verifyPhoneNumberData,
      ...createDocumentsFileLinksData,
    },
    error: {
      profileDetailsError,
      individualDraftAccountError,
      createDraftAccountError,
      phoneNumberError,
      verifyPhoneNumberError,
      createDocumentsFileLinksError,
    },
    isLoading:
      isProfileDetailsLoading ||
      isIndividualDraftAccountLoading ||
      isCreateDraftAccountLoading ||
      isPhoneNumberLoading ||
      isVerifyPhoneNumberLoading ||
      isCreateDocumentsFileLinksLoading,
    isSuccess: isCreateDraftAccountSuccess || isSetPhoneNumberSuccess || isProfileDetailsSuccess || isCreateDocumentsFileLinksSuccess,
    updateData,
  };
};
