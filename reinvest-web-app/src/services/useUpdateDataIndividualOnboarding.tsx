import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { useCreateDraftAccount } from 'reinvest-app-common/src/services/queries/createDraftAccount';
import { AddressInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { OnboardingFormFields } from 'views/onboarding/form-flow/form-fields';
import { Identifiers } from 'views/onboarding/form-flow/identifiers';

import { getApiClient } from './getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from './queries/useSendDocumentsToS3AndGetScanIds';

const profileDetailsSteps = [
  Identifiers.IDENTIFICATION_DOCUMENTS,
  Identifiers.IDENTIFICATION_DOCUMENTS_VALIDATION,
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

    //complete profile details
    if (profileDetailsSteps.includes(stepId)) {
      const { identificationDocument, address: storageAddress } = storedFields;

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
          address,
          idScan: idScan.length ? idScan : undefined,
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
  };

  return {
    data: {
      ...profileDetailsData,
      ...individualDraftAccoutntData,
      ...createDraftAccountData,
      ...createDocumentsFileLinksData,
    },
    error: {
      profileDetailsError,
      individualDraftAccountError,
      createDraftAccountError,
      createDocumentsFileLinksError,
      sendDocumentsToS3AndGetScanIdsError,
    },
    isLoading:
      isProfileDetailsLoading ||
      isIndividualDraftAccountLoading ||
      isCreateDraftAccountLoading ||
      isCreateDocumentsFileLinksLoading ||
      isSendDocumentToS3AndGetScanIdsLoading,
    isSuccess: isCreateDraftAccountSuccess || isProfileDetailsSuccess || isIndividualDraftAccountSuccess || isSendDocumentToS3AndGetScanIdsSuccess,
    updateData,
  };
};
