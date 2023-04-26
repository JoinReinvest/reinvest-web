import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ACCOUNT_TYPES_AS_OPTIONS, ACCOUNT_TYPES_VALUES } from 'reinvest-app-common/src/constants/account-types';
import { CorporationAnnualRevenue, CorporationNumberOfEmployees } from 'reinvest-app-common/src/constants/corporation';
import { Industry } from 'reinvest-app-common/src/constants/industries';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDraftAccount } from 'reinvest-app-common/src/services/queries/createDraftAccount';
import { useGetCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/getCorporateDraftAccount';
import { useGetIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/getIndividualDraftAccount';
import { useGetListAccount } from 'reinvest-app-common/src/services/queries/getListAccount';
import { useGetListAccountTypesUserCanOpen } from 'reinvest-app-common/src/services/queries/getListAccountTypesUserCanOpen';
import { useGetPhoneCompleted } from 'reinvest-app-common/src/services/queries/getPhoneCompleted';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useGetTrustDraftAccount } from 'reinvest-app-common/src/services/queries/getTrustDraftAccount';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import {
  AccountType,
  CompanyTypeEnum,
  CorporateCompanyTypeEnum,
  DraftAccountType,
  Stakeholder,
  TrustCompanyTypeEnum,
} from 'reinvest-app-common/src/types/graphql';
import { SelectCardOption } from 'reinvest-app-common/src/types/select-card-option';
import { getApiClient } from 'services/getApiClient';
import { WhyRequiredAccountTypeModal } from 'views/whyRequiredModals/WhyRequiredAccountTypeModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { formatStakeholdersForStorage } from '../utilities';

type Fields = Pick<OnboardingFormFields, 'accountType'>;

const schema = z.object({
  accountType: z.enum(ACCOUNT_TYPES_VALUES),
});

export const StepAccountType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [accountId, setAccountId] = useState(storeFields.accountId || '');
    const [accountType, setAccountType] = useState('');
    const [accountTypesAvailableToOpen, setAccountTypesAvailableToOpen] = useState<SelectCardOption[]>([]);
    const { data: profileData } = useGetUserProfile(getApiClient);
    const { data: listAccounts } = useGetListAccount(getApiClient);
    const { data: phoneCompleted } = useGetPhoneCompleted(getApiClient);
    const {
      data: listAccountTypesUserCanOpen,
      isLoading: isListAccountTypesUserCanOpenLoading,
      isSuccess: isListAccountTypesUserCanOpenSuccess,
    } = useGetListAccountTypesUserCanOpen(getApiClient);

    const { isSuccess: isTrustDraftAccountSuccess, data: trustDraftAccountData } = useGetTrustDraftAccount(getApiClient, {
      accountId: accountId,
      config: { enabled: !!accountId && accountType === DraftAccountType.Trust },
    });

    const { isSuccess: isIndividualDraftAccountSuccess, data: individualDraftAccountData } = useGetIndividualDraftAccount(getApiClient, {
      accountId: accountId,
      config: { enabled: !!accountId && accountType === DraftAccountType.Individual },
    });

    const { isSuccess: isCorporateDraftAccountSuccess, data: corporateDraftAccountData } = useGetCorporateDraftAccount(getApiClient, {
      accountId: accountId,
      config: { enabled: !!accountId && accountType === DraftAccountType.Corporate },
    });

    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const {
      data: individualAccountData,
      error: createDraftAccountError,
      isLoading,
      mutateAsync: createDraftAccountMutate,
      isSuccess,
    } = useCreateDraftAccount(getApiClient);

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      const account = listAccounts?.find(account => account?.type === fields.accountType);

      if (account && fields.accountType) {
        setAccountId(account?.id || '');
        setAccountType(fields.accountType);
      }

      if (fields.accountType && !account) {
        await createDraftAccountMutate({ type: fields.accountType });
      }
    };

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    useEffect(() => {
      if (isTrustDraftAccountSuccess && trustDraftAccountData && accountType === DraftAccountType.Trust) {
        const { details } = trustDraftAccountData;
        const documentsForTrust: DocumentFile[] = details?.companyDocuments?.map(idScan => ({ id: idScan?.id, fileName: idScan?.fileName })) || [];
        const stakeholders = details?.stakeholders ? formatStakeholdersForStorage(details.stakeholders as Stakeholder[]) : undefined;

        const trustData = {
          trustType: details?.companyType?.type === CompanyTypeEnum.Revocable ? TrustCompanyTypeEnum.Revocable : TrustCompanyTypeEnum.Irrevocable,
          trustLegalName: details?.companyName?.name || '',
          ein: details?.ein?.ein || '',
          fiduciaryEntityInformation: {
            annualRevenue: (details?.annualRevenue?.range as CorporationAnnualRevenue) || undefined,
            numberOfEmployees: (details?.numberOfEmployees?.range as CorporationNumberOfEmployees) || undefined,
            industry: (details?.industry?.value as Industry) || undefined,
          },
          businessAddress: {
            addressLine1: details?.address?.addressLine1,
            addressLine2: details?.address?.addressLine2,
            city: details?.address?.city,
            country: details?.address?.country,
            state: details?.address?.state,
            zip: details?.address?.zip,
          },
          trustTrusteesGrantorsOrProtectors: stakeholders,
          documentsForTrust,
        };

        updateStoreFields({
          ...storeFields,
          ...trustData,
          accountId: trustDraftAccountData?.id || '',
          isCompletedProfile: !!profileData?.isCompleted,
          accountType: DraftAccountType.Trust,
        });
        moveToNextStep();
      }
    }, [isTrustDraftAccountSuccess, moveToNextStep, storeFields, trustDraftAccountData, updateStoreFields, profileData, accountType]);

    useEffect(() => {
      if (isIndividualDraftAccountSuccess && individualDraftAccountData && accountType === DraftAccountType.Individual) {
        const { details } = individualDraftAccountData;
        const individualData = {
          employmentStatus: details?.employmentStatus?.status || undefined,
          employmentDetails: {
            employerName: details?.employer?.nameOfEmployer || '',
            industry: details?.employer?.industry || '',
            occupation: details?.employer?.title || '',
          },
          netIncome: details?.netIncome?.range || undefined,
          netWorth: details?.netWorth?.range || undefined,
        };

        updateStoreFields({
          ...storeFields,
          ...individualData,
          accountId: individualDraftAccountData?.id || '',
          isCompletedProfile: !!profileData?.isCompleted,
          accountType: DraftAccountType.Individual,
        });
        moveToNextStep();
      }
    }, [isIndividualDraftAccountSuccess, moveToNextStep, storeFields, individualDraftAccountData, updateStoreFields, profileData, accountType]);

    useEffect(() => {
      if (isCorporateDraftAccountSuccess && corporateDraftAccountData && accountType === DraftAccountType.Corporate) {
        const { details } = corporateDraftAccountData;

        const documentsForCorporation: DocumentFile[] = details?.companyDocuments?.map(idScan => ({ id: idScan?.id, fileName: idScan?.fileName })) || [];
        const stakeholders = details?.stakeholders ? formatStakeholdersForStorage(details.stakeholders as Stakeholder[]) : undefined;

        const corporateData = {
          corporationType: details?.companyType?.type ? getCorporateCompanyType(details.companyType.type) : undefined,
          corporationLegalName: details?.companyName?.name || '',
          ein: details?.ein?.ein || '',
          fiduciaryEntityInformation: {
            annualRevenue: (details?.annualRevenue?.range as CorporationAnnualRevenue) || undefined,
            numberOfEmployees: (details?.numberOfEmployees?.range as CorporationNumberOfEmployees) || undefined,
            industry: (details?.industry?.value as Industry) || undefined,
          },
          businessAddress: {
            addressLine1: details?.address?.addressLine1,
            addressLine2: details?.address?.addressLine2,
            city: details?.address?.city,
            country: details?.address?.country,
            state: details?.address?.state,
            zip: details?.address?.zip,
          },
          companyMajorStakeholderApplicants: stakeholders,
          documentsForCorporation,
        };

        updateStoreFields({
          ...storeFields,
          ...corporateData,
          accountId: corporateDraftAccountData?.id || '',
          isCompletedProfile: !!profileData?.isCompleted,
          accountType: DraftAccountType.Corporate,
        });
        moveToNextStep();
      }
    }, [isCorporateDraftAccountSuccess, moveToNextStep, storeFields, corporateDraftAccountData, updateStoreFields, profileData, accountType]);

    useEffect(() => {
      if (isSuccess && profileData) {
        updateStoreFields({
          ...storeFields,
          ein: undefined,
          fiduciaryEntityInformation: undefined,
          businessAddress: undefined,
          trustTrusteesGrantorsOrProtectors: undefined,
          documentsForCorporation: undefined,
          documentsForTrust: undefined,
          companyMajorStakeholderApplicants: undefined,
          accountId: individualAccountData?.id || '',
          isCompletedProfile: !!profileData.isCompleted,
        });
        moveToNextStep();
      }
    }, [individualAccountData, isSuccess, moveToNextStep, storeFields, updateStoreFields, profileData]);

    useEffect(() => {
      if (phoneCompleted) {
        updateStoreFields({
          ...storeFields,
          _isPhoneCompleted: phoneCompleted,
        });
      }
    }, [phoneCompleted, storeFields, updateStoreFields]);

    useEffect(() => {
      if (listAccountTypesUserCanOpen) {
        setAccountTypesAvailableToOpen(
          ACCOUNT_TYPES_AS_OPTIONS.filter(accountType => (listAccountTypesUserCanOpen as AccountType[]).includes(accountType.value as AccountType)),
        );
      }
    }, [isListAccountTypesUserCanOpenSuccess, listAccountTypesUserCanOpen]);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            {!isListAccountTypesUserCanOpenLoading && (
              <BlackModalTitle title={accountTypesAvailableToOpen.length ? 'Which type of account would you like to open?' : 'You cannot open any account'} />
            )}

            {createDraftAccountError && <ErrorMessagesHandler error={createDraftAccountError} />}

            {isListAccountTypesUserCanOpenLoading && (
              <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
                <IconSpinner />
              </div>
            )}
            {!isListAccountTypesUserCanOpenLoading && !!accountTypesAvailableToOpen.length && (
              <div className="flex w-full flex-col gap-24">
                <SelectionCards
                  name="accountType"
                  control={control}
                  options={accountTypesAvailableToOpen}
                  className="flex flex-col items-stretch justify-center gap-24"
                  orientation="vertical"
                />

                <OpenModalLink
                  label="Not sure which is best for you?"
                  green
                  center
                  onClick={onLinkClick}
                />
              </div>
            )}
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              disabled={shouldButtonBeDisabled}
              label="Continue"
              loading={isLoading}
            />
          </ButtonStack>
        </Form>

        <WhyRequiredAccountTypeModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};

const getCorporateCompanyType = (companyType: CompanyTypeEnum): CorporateCompanyTypeEnum => {
  if (companyType === CompanyTypeEnum.Corporation) {
    return CorporateCompanyTypeEnum.Corporation;
  }

  if (companyType === CompanyTypeEnum.Llc) {
    return CorporateCompanyTypeEnum.Llc;
  }

  return CorporateCompanyTypeEnum.Partnership;
};
