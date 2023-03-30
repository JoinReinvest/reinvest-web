import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { useCreateDraftAccount } from 'reinvest-app-common/src/services/queries/createDraftAccount';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import { useVerifyPhoneNumber } from 'reinvest-app-common/src/services/queries/verifyPhoneNumber';
import { AddressInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { OnboardingFormFields } from 'views/onboarding/form-flow/form-fields';
import { Identifiers } from 'views/onboarding/form-flow/identifiers';

import { getApiClient } from './getApiClient';
import { getStatements } from './getStatements';
import { useSendDocumentsToS3AndGetScanIds } from './queries/useSendDocumentsToS3AndGetScanIds';

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

const individualDraftAccountSteps = [Identifiers.EMPLOYMENT_DETAILS, Identifiers.EMPLOYMENT_STATUS, Identifiers.PROFILE_PICTURE];

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
    error: sendDocumentsToS3AndGetScanIdsError,
    isLoading: isSendDocumentToS3AndGetScanIdsLoading,
    isSuccess: isSendDocumentToS3AndGetScanIdsSuccess,
    mutateAsync: sendDocumentsToS3AndGetScanIdsMutate,
  } = useSendDocumentsToS3AndGetScanIds();

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
          domicile,
          statements,
          ssn,
          investingExperience,
          address,
          idScan: idScan.length ? idScan : undefined,
          verifyAndFinish: stepId === Identifiers.EXPERIENCE,
          dateOfBirth: dateOfBirth
            ? {
                dateOfBirth,
              }
            : undefined,
        },
      });
    }

    //complete individual draft account
    if (individualDraftAccountSteps.includes(stepId) && storedFields.accountId) {
      const { employmentStatus: storedemploymentStatus, employmentDetails, accountId } = storedFields;

      const employmentStatus = storedemploymentStatus ? { status: storedemploymentStatus } : undefined;
      const employer = employmentDetails
        ? { nameOfEmployer: employmentDetails.employerName, title: employmentDetails.occupation, industry: employmentDetails.industry }
        : undefined;

      await completeIndividualDraftAccountMutate({
        accountId,
        input: { employmentStatus, employer },
      });
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
      sendDocumentsToS3AndGetScanIdsError,
    },
    isLoading:
      isProfileDetailsLoading ||
      isIndividualDraftAccountLoading ||
      isCreateDraftAccountLoading ||
      isPhoneNumberLoading ||
      isVerifyPhoneNumberLoading ||
      isCreateDocumentsFileLinksLoading ||
      isSendDocumentToS3AndGetScanIdsLoading,
    isSuccess:
      isCreateDraftAccountSuccess ||
      isSetPhoneNumberSuccess ||
      isProfileDetailsSuccess ||
      isIndividualDraftAccountSuccess ||
      isVerifyPhoneNumberSuccess ||
      isSendDocumentToS3AndGetScanIdsSuccess,
    updateData,
  };
};
