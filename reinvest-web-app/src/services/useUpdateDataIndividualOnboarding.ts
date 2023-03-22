import { profileFields } from 'constants/individualOnboardingFields';
import { AccreditedInvestorStatement, StatementType } from 'types/graphql';
import { isEmptyObject } from 'utils/isEmptyObject';
import { OnboardingFormFields } from 'views/onboarding/form-flow/form-fields';
import { Identifiers } from 'views/onboarding/form-flow/identifiers';

import { fetcher } from './fetcher';
import { useCompleteIndividualDraftAccount } from './queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from './queries/completeProfileDetails';
import { useCreateAvatarFileLink } from './queries/createAvatarFileLink';
import { useCreateDocumentsFileLinks } from './queries/createDocumentsFileLinks';
import { useCreateDraftAccount } from './queries/createDraftAccount';
import { useOpenAccount } from './queries/openAccount';
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
  } = useCreateDraftAccount();

  const {
    data: profileDetailsData,
    error: profileDetailsError,
    isLoading: isProfileDetailsLoading,
    mutateAsync: completeProfileMutate,
    isSuccess: isProfileDetailsSuccess,
  } = useCompleteProfileDetails();

  const {
    data: individualDraftAccoutntData,
    error: individualDraftAccountError,
    isLoading: isIndividualDraftAccountLoading,
    mutateAsync: completeIndividualDraftAccountMutate,
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
    isSuccess: isCreateDocumentsFileLinksSuccess,
    mutateAsync: createDocumentsFileLinksMutate,
  } = useCreateDocumentsFileLinks();

  const {
    error: createAvatarLinkError,
    isLoading: isCreateAvatarLinkLoading,
    isSuccess: isCreateAvatarLinkSuccess,
    mutateAsync: createAvatarLinkMutate,
  } = useCreateAvatarFileLink();

  const { error: openAccountError, isLoading: isOpenAccountLoading, mutate: openAccountMutate, isSuccess: isOpenAccountSuccess } = useOpenAccount();

  const updateData = async (stepId: Identifiers, storedFields: OnboardingFormFields) => {
    const storedFieldsMap = new Map<string, any>(Object.entries(storedFields));

    const profileDetails = getObjecyByKeys(profileFields, storedFieldsMap);

    if (storedFields.accountType && createIndividualDraftAccountSteps.includes(stepId)) {
      createDraftAccountMutate(storedFields.accountType);
    }

    if (storedFields.phone?.countryCode && storedFields.phone?.number && stepId === Identifiers.PHONE_NUMBER) {
      setPhoneNumberMutate({ countryCode: storedFields.phone.countryCode, phoneNumber: storedFields.phone.number });
    }

    if (!isEmptyObject(profileDetails) && profileDetailsSteps.includes(stepId)) {
      const { residency, statementType, finraInstitutionName, socialSecurityNumber, experience, isAccreditedInvestor } = storedFields;
      const domicile = residency ? { ...profileDetails.domicile, type: residency } : undefined;
      const statements = [];
      statementType && finraInstitutionName ? statements.push({ type: statementType, forFINRA: { name: finraInstitutionName } }) : undefined;
      stepId === Identifiers.ACCREDITED_INVESTOR
        ? statements.push({
            type: StatementType.AccreditedInvestor,
            forAccreditedInvestor: {
              statement: isAccreditedInvestor
                ? AccreditedInvestorStatement.IAmAnAccreditedInvestor
                : AccreditedInvestorStatement.IAmNotExceeding_10PercentOfMyNetWorthOrAnnualIncome,
            },
          })
        : undefined;
      const ssn = socialSecurityNumber ? { ssn: socialSecurityNumber } : undefined;
      const investingExperience = experience ? { experience: experience } : undefined;

      const address = stepId === Identifiers.PERMANENT_ADDRESS ? { ...storedFields.permanentAddress, country: 'USA' } : undefined;
      const idScan = [];

      // send documents to s3
      if (storedFields.identificationDocument?.front && storedFields.identificationDocument?.back && stepId === Identifiers.IDENTIFICATION_DOCUMENTS) {
        const documentsFileLinks = await createDocumentsFileLinksMutate({ numberOfLinks: 2 });
        const s3urls = documentsFileLinks?.map(documentFileLink => documentFileLink?.url) as string[];

        try {
          s3urls[0] ? await fetcher(s3urls[0], 'PUT', storedFields.identificationDocument.back) : null;
        } catch (error) {
          return error;
        }

        try {
          s3urls[1] ? await fetcher(s3urls[1], 'PUT', storedFields.identificationDocument.front) : null;
        } catch (error) {
          return error;
        }

        const documentIds = documentsFileLinks?.map(documentFileLink => ({ id: documentFileLink?.id })) as { id: string }[];
        idScan.push(...documentIds);
      }

      await completeProfileMutate({
        ...profileDetails,
        domicile,
        statements,
        ssn,
        investingExperience,
        address,
        idScan: idScan.length ? idScan : undefined,
        verifyAndFinish: stepId === Identifiers.EXPERIENCE,
      });
    }

    if (individualDraftAccountSteps.includes(stepId)) {
      const accountId = 'aa4e7363-3181-4d1e-ac68-864efd748e3e'; //Get from store
      const {
        employmentStatus: storedemploymentStatus,
        employmentDetails,
        netWorth: storageNetWorth,
        netIncome: storageNetIncome,
        profilePicture,
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

        try {
          link?.url ? await fetcher(link?.url, 'PUT', profilePicture) : null;
        } catch (error) {
          return error;
        }
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

    if (storedFields.authCode && storedFields.phone.countryCode && storedFields.phone.number && stepId === Identifiers.CHECK_YOUR_PHONE) {
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
      isCreateAvatarLinkLoading,
    isSuccess:
      isCreateDraftAccountSuccess ||
      isSetPhoneNumberSuccess ||
      isProfileDetailsSuccess ||
      isCreateDocumentsFileLinksSuccess ||
      isOpenAccountSuccess ||
      isCreateAvatarLinkSuccess,
    updateData,
  };
};
