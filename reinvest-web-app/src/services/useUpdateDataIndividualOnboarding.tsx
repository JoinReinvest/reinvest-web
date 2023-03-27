import { profileFields } from 'constants/individualOnboardingFields';
import { useState } from 'react';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { useCreateDraftAccount } from 'reinvest-app-common/src/services/queries/createDraftAccount';
import { useOpenAccount } from 'reinvest-app-common/src/services/queries/openAccount';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import { useVerifyPhoneNumber } from 'reinvest-app-common/src/services/queries/verifyPhoneNumber';
import { AddressInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { isEmptyObject } from 'utils/isEmptyObject';
import { OnboardingFormFields } from 'views/onboarding/form-flow/form-fields';
import { Identifiers } from 'views/onboarding/form-flow/identifiers';

import { getApiClient } from './getApiClient';
import { getIdScans } from './getIdScans';
import { getStatements } from './getStatements';
import { sendFilesToS3Bucket } from './sendFilesToS3Bucket';

const getObjecyByKeys = (keys: string[], fields: Map<string, any>) => {
  return keys.reduce<Record<string, any>>((o, key) => {
    const data = fields.get(key);

    if (!data) return o;

    return Object.assign(o, { [key]: data });
  }, {});
};

const profileDetailsSteps = [
  Identifiers.FULL_NAME,
  Identifiers.DATE_OF_BIRTH,
  Identifiers.RESIDENCY_STATUS,
  Identifiers.RESIDENCY_GREEN_CARD,
  Identifiers.RESIDENCY_VISA,
  Identifiers.COMPLIANCES,
  Identifiers.FINRA_INSTITUTION,
  Identifiers.EXPERIENCE,
  Identifiers.IDENTIFICATION_DOCUMENTS,
  Identifiers.IDENTIFICATION_DOCUMENTS_VALIDATION,
  Identifiers.SOCIAL_SECURITY_NUMBER,
  Identifiers.SOCIAL_SECURITY_NUMBER_VALIDATION,
  Identifiers.PERMANENT_ADDRESS,
  Identifiers.ACCREDITED_INVESTOR,
];

const individualDraftAccountSteps = [
  Identifiers.EMPLOYMENT_DETAILS,
  Identifiers.EMPLOYMENT_STATUS,
  Identifiers.NET_WORTH_AND_INCOME,
  Identifiers.PROFILE_PICTURE,
];

const createIndividualDraftAccountSteps = [Identifiers.ACCOUNT_TYPE];

export const useUpdateDataIndividualOnboarding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: createDraftAccountData,
    error: createDraftAccountError,
    isLoading: isCreateDraftAccountLoading,
    mutate: createDraftAccountMutate,
    isSuccess: isCreateDraftAccountSuccess,
  } = useCreateDraftAccount(getApiClient);

  const {
    data: profileDetailsData,
    error: profileDetailsError,
    isLoading: isProfileDetailsLoading,
    mutateAsync: completeProfileMutate,
    isSuccess: isProfileDetailsSuccess,
  } = useCompleteProfileDetails(getApiClient);

  const {
    data: individualDraftAccoutntData,
    error: individualDraftAccountError,
    isLoading: isIndividualDraftAccountLoading,
    mutateAsync: completeIndividualDraftAccountMutate,
    isSuccess: isIndividualDraftAccountSuccess,
  } = useCompleteIndividualDraftAccount(getApiClient);

  const {
    data: phoneNumberData,
    error: phoneNumberError,
    isLoading: isPhoneNumberLoading,
    mutate: setPhoneNumberMutate,
    isSuccess: isSetPhoneNumberSuccess,
  } = useSetPhoneNumber(getApiClient);

  const {
    data: verifyPhoneNumberData,
    error: verifyPhoneNumberError,
    isLoading: isVerifyPhoneNumberLoading,
    mutate: verifyPhoneNumberMutate,
  } = useVerifyPhoneNumber(getApiClient);

  const {
    data: createDocumentsFileLinksData,
    error: createDocumentsFileLinksError,
    isLoading: isCreateDocumentsFileLinksLoading,
    mutateAsync: createDocumentsFileLinksMutate,
  } = useCreateDocumentsFileLinks(getApiClient);

  const {
    error: createAvatarLinkError,
    isLoading: isCreateAvatarLinkLoading,
    isSuccess: isCreateAvatarLinkSuccess,
    mutateAsync: createAvatarLinkMutate,
  } = useCreateAvatarFileLink(getApiClient);

  const { error: openAccountError, isLoading: isOpenAccountLoading, mutate: openAccountMutate, isSuccess: isOpenAccountSuccess } = useOpenAccount(getApiClient);

  const updateData = async (stepId: Identifiers, storedFields: OnboardingFormFields) => {
    const storedFieldsMap = new Map<string, any>(Object.entries(storedFields));

    const profileDetails = getObjecyByKeys(profileFields, storedFieldsMap);

    if (storedFields.accountType && createIndividualDraftAccountSteps.includes(stepId)) {
      createDraftAccountMutate({ type: storedFields.accountType });
    }

    if (storedFields.phone?.countryCode && storedFields.phone?.number && stepId === Identifiers.PHONE_NUMBER) {
      setPhoneNumberMutate({ countryCode: storedFields.phone.countryCode, phoneNumber: storedFields.phone.number });
    }

    //complete profile details
    if (!isEmptyObject(profileDetails) && profileDetailsSteps.includes(stepId)) {
      const {
        residency,
        statementTypes,
        finraInstitutionName,
        ssn: storedSsn,
        experience,
        isAccreditedInvestor,
        identificationDocument,
        address: storageAddress,
      } = storedFields;
      const domicile = residency ? { ...profileDetails.domicile, type: residency } : undefined;
      const statements = getStatements(statementTypes || [], finraInstitutionName, isAccreditedInvestor);
      const ssn = storedSsn ? { ssn: storedSsn } : undefined;
      const investingExperience = experience ? { experience: experience } : undefined;
      const address = stepId === Identifiers.PERMANENT_ADDRESS ? ({ ...storageAddress, country: 'USA' } as AddressInput) : undefined;
      const idScan = [];

      // send documents to s3
      if (identificationDocument?.front && identificationDocument?.back && stepId === Identifiers.IDENTIFICATION_DOCUMENTS) {
        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: 2 })) as PutFileLink[];
        setIsLoading(true);
        const idScans = await getIdScans(documentsFileLinks, identificationDocument);
        idScan.push(...idScans);
        setIsLoading(false);
      }

      await completeProfileMutate({
        input: {
          ...profileDetails,
          domicile,
          statements,
          ssn,
          investingExperience,
          address,
          idScan: idScan.length ? idScan : undefined,
          verifyAndFinish: stepId === Identifiers.EXPERIENCE,
        },
      });
    }

    //complete individual draft account
    if (individualDraftAccountSteps.includes(stepId) && storedFields.accountId) {
      const {
        employmentStatus: storedemploymentStatus,
        employmentDetails,
        netWorth: storageNetWorth,
        netIncome: storageNetIncome,
        profilePicture,
        accountId,
      } = storedFields;

      const employmentStatus = storedemploymentStatus ? { status: storedemploymentStatus } : undefined;
      const employer = employmentDetails
        ? { nameOfEmployer: employmentDetails.employerName, title: employmentDetails.occupation, industry: employmentDetails.industry }
        : undefined;
      const netWorth = storageNetWorth ? { range: storageNetWorth } : undefined;
      const netIncome = storageNetIncome ? { range: storageNetIncome } : undefined;

      let avatarId = '';

      if (profilePicture && stepId === Identifiers.PROFILE_PICTURE) {
        const link = await createAvatarLinkMutate({});
        link?.url && sendFilesToS3Bucket([{ file: profilePicture, url: link.url }]);
        avatarId = link?.id || '';
      }

      const avatar = avatarId ? { id: avatarId } : undefined;

      const individualDraftAccount = await completeIndividualDraftAccountMutate({
        accountId,
        input: { employmentStatus, employer, netWorth, netIncome, avatar, verifyAndFinish: stepId === Identifiers.PROFILE_PICTURE },
      });

      if (stepId === Identifiers.PROFILE_PICTURE && individualDraftAccount?.isCompleted) {
        openAccountMutate({ draftAccountId: accountId });
      }
    }

    //verify phone number
    if (storedFields.authCode && storedFields.phone?.countryCode && storedFields.phone?.number && stepId === Identifiers.CHECK_YOUR_PHONE) {
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
      openAccountError,
      createAvatarLinkError,
    },
    isLoading:
      isProfileDetailsLoading ||
      isIndividualDraftAccountLoading ||
      isCreateDraftAccountLoading ||
      isPhoneNumberLoading ||
      isVerifyPhoneNumberLoading ||
      isCreateDocumentsFileLinksLoading ||
      isOpenAccountLoading ||
      isCreateAvatarLinkLoading ||
      isLoading,
    isSuccess:
      isCreateDraftAccountSuccess ||
      isSetPhoneNumberSuccess ||
      isProfileDetailsSuccess ||
      isOpenAccountSuccess ||
      isCreateAvatarLinkSuccess ||
      isIndividualDraftAccountSuccess,
    updateData,
  };
};
