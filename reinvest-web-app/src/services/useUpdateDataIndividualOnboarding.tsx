import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { useCreateDraftAccount } from 'reinvest-app-common/src/services/queries/createDraftAccount';
import { useOpenAccount } from 'reinvest-app-common/src/services/queries/openAccount';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import { useVerifyPhoneNumber } from 'reinvest-app-common/src/services/queries/verifyPhoneNumber';
import { AddressInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { OnboardingFormFields } from 'views/onboarding/form-flow/form-fields';
import { Identifiers } from 'views/onboarding/form-flow/identifiers';

import { getApiClient } from './getApiClient';
import { getStatements } from './getStatements';
import { useSendDocumentsToS3AndGetScanIds } from './queries/useSendDocumentsToS3AndGetScanIds';
import { sendFilesToS3Bucket } from './sendFilesToS3Bucket';

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
    isSuccess: isVerifyPhoneNumberSuccess,
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

  const {
    error: sendDocumentsToS3AndGetScanIdsError,
    isLoading: isSendDocumentToS3AndGetScanIdsLoading,
    isSuccess: isSendDocumentToS3AndGetScanIdsSuccess,
    mutateAsync: sendDocumentsToS3AndGetScanIdsMutate,
  } = useSendDocumentsToS3AndGetScanIds();

  const { error: openAccountError, isLoading: isOpenAccountLoading, mutate: openAccountMutate, isSuccess: isOpenAccountSuccess } = useOpenAccount(getApiClient);

  const updateData = async (stepId: Identifiers, storedFields: OnboardingFormFields) => {
    if (storedFields.accountType && createIndividualDraftAccountSteps.includes(stepId)) {
      createDraftAccountMutate({ type: storedFields.accountType });
    }

    if (storedFields.phone?.countryCode && storedFields.phone?.number && stepId === Identifiers.PHONE_NUMBER) {
      setPhoneNumberMutate({ countryCode: storedFields.phone.countryCode, phoneNumber: storedFields.phone.number });
    }

    //complete profile details
    if (profileDetailsSteps.includes(stepId)) {
      const {
        residency,
        statementTypes,
        finraInstitutionName,
        ssn: storedSsn,
        experience,
        isAccreditedInvestor,
        identificationDocument,
        address: storageAddress,
        name,
        dateOfBirth,
        domicile: storedDomicle,
      } = storedFields;
      const domicile = residency ? { ...storedDomicle, type: residency } : undefined;
      const statements = getStatements(statementTypes || [], finraInstitutionName, isAccreditedInvestor);
      const ssn = storedSsn ? { ssn: storedSsn } : undefined;
      const investingExperience = experience ? { experience: experience } : undefined;
      const address = stepId === Identifiers.PERMANENT_ADDRESS ? ({ ...storageAddress, country: 'USA' } as AddressInput) : undefined;
      const idScan = [];

      // send documents to s3
      if (identificationDocument?.front && identificationDocument?.back && stepId === Identifiers.IDENTIFICATION_DOCUMENTS) {
        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: 2 })) as PutFileLink[];
        const scanIds = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocument });
        idScan.push(...scanIds);
      }

      await completeProfileMutate({
        input: {
          name,
          domicile,
          statements,
          ssn,
          investingExperience,
          address,
          idScan: idScan.length ? idScan : undefined,
          verifyAndFinish: stepId === Identifiers.EXPERIENCE,
          dateOfBirth,
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
        const { id, url } = await createAvatarLinkMutate({});
        url && sendFilesToS3Bucket([{ file: profilePicture, url, id }]);
        avatarId = id || '';
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
      sendDocumentsToS3AndGetScanIdsError,
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
      isSendDocumentToS3AndGetScanIdsLoading,
    isSuccess:
      isCreateDraftAccountSuccess ||
      isSetPhoneNumberSuccess ||
      isProfileDetailsSuccess ||
      isOpenAccountSuccess ||
      isCreateAvatarLinkSuccess ||
      isIndividualDraftAccountSuccess ||
      isVerifyPhoneNumberSuccess ||
      isSendDocumentToS3AndGetScanIdsSuccess,
    updateData,
  };
};
