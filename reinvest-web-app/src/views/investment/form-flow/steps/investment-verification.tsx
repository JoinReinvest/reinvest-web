import { IconSpinner } from 'assets/icons/IconSpinner';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useCallback, useEffect, useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useAbortInvestment } from 'reinvest-app-common/src/services/queries/abortInvestment';
import { useGetAccountStats } from 'reinvest-app-common/src/services/queries/getAccountStats';
import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';
import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { useStartInvestment } from 'reinvest-app-common/src/services/queries/startInvestment';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { ActionName, DomicileType, Stakeholder, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { formatStakeholdersForStorage } from 'views/onboarding/form-flow/utilities';

import { useInvestmentContext } from '../../../../providers/InvestmentProvider';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'We are verifying your investment.';
const SUBTITLE = 'Verifying';

export const StepInvestmentVerification: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_VERIFICATION,

  isAValidationView: true,

  Component: ({ moveToNextStep, updateStoreFields, storeFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const { investmentId } = useInvestmentContext();
    const { mutateAsync, ...verifyAccountMeta } = useVerifyAccount(getApiClient);
    const { mutateAsync: startInvestmentMutate, ...startInvestmentMeta } = useStartInvestment(getApiClient);
    const { refetch: refetchAccountStats } = useGetAccountStats(getApiClient, { accountId: activeAccount?.id || '', config: { enabled: false } });
    const { ...abortInvestmentMeta } = useAbortInvestment(getApiClient);
    const { refetch: refetchGetInvestmentSummary, ...getInvestmentSummaryMeta } = useGetInvestmentSummary(getApiClient, {
      investmentId: investmentId || '',
      config: { enabled: false },
    });
    const { recurringInvestment, initiateRecurringInvestment } = useRecurringInvestment();
    const { userProfile } = useActiveAccount();
    const [shouldUpdateProfileDetails, setShouldUpdateProfileDetails] = useState(false);
    const [shouldUpdateStakeholderData, setShouldUpdateStakeholderData] = useState(false);
    const [shouldUpdateCompanyData, setShouldUpdateCompanyData] = useState(false);
    const shouldUpdateData = shouldUpdateProfileDetails || shouldUpdateStakeholderData || shouldUpdateCompanyData;

    const {
      refetch: refetchCorporate,
      isRefetching: isCorporateRefetching,
      data: getCorporateData,
    } = useGetCorporateAccount(getApiClient, { accountId: activeAccount?.id || '', config: { enabled: false } });

    const startInvestmentCallback = useCallback(async () => {
      if (investmentId) {
        await startInvestmentMutate({ investmentId, approveFees: true });
        await refetchAccountStats();
      }
    }, [investmentId, refetchAccountStats, startInvestmentMutate]);

    const updateProfileDetailsCallback = useCallback(async () => {
      if (userProfile) {
        const { details } = userProfile;
        const name = { firstName: details?.firstName || '', lastName: details?.lastName || '', middleName: details?.middleName || '' };
        const dateOfBirth = details?.dateOfBirth;
        const identificationDocuments: DocumentFile[] = details?.idScan?.map(idScan => ({ id: idScan?.id, fileName: idScan?.fileName })) || [];
        const residency = details?.domicile?.type;
        const domicile = details?.domicile || { type: DomicileType.Citizen, visaType: '', birthCountry: '', citizenshipCountry: '' };
        const ssn = details?.ssn || '';
        const address = {
          addressLine1: details?.address?.addressLine1 || '',
          addressLine2: details?.address?.addressLine2 || '',
          city: details?.address?.city || '',
          country: details?.address?.country || '',
          state: details?.address?.state || '',
          zip: details?.address?.zip || '',
        };

        await updateStoreFields({ name, dateOfBirth, residency, identificationDocuments, domicile, ssn, address, _shouldUpdateProfileDetails: true });
      }
    }, [updateStoreFields, userProfile]);

    const updateCorporateDetailsCallback = useCallback(async () => {
      if (!isCorporateRefetching && getCorporateData) {
        const { details } = getCorporateData;
        const stakeholdersToStoreFields = details?.stakeholders ? formatStakeholdersForStorage(details?.stakeholders as Stakeholder[]) : [];
        updateStoreFields({ companyMajorStakeholderApplicants: stakeholdersToStoreFields, _shouldUpdateStakeholderData: true });
      }
    }, [getCorporateData, isCorporateRefetching, updateStoreFields]);

    //start verify account
    useEffect(() => {
      async function initiateVerification() {
        if (activeAccount?.id) {
          await mutateAsync({ accountId: activeAccount.id });
        }
      }

      initiateVerification();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      async function initiateRecurringInvestments() {
        if (activeAccount?.id) {
          (await recurringInvestment) && (await initiateRecurringInvestment());
        }
      }

      async function updateStoreFieldsAsync({
        _shouldUpdateProfileDetails,
        _shouldUpdateStakeholderData,
        _shouldUpdateCompanyData,
      }: {
        _shouldUpdateCompanyData: boolean;
        _shouldUpdateProfileDetails: boolean;
        _shouldUpdateStakeholderData: boolean;
      }) {
        await updateStoreFields({
          _shouldUpdateProfileDetails: _shouldUpdateProfileDetails,
          _shouldUpdateStakeholderData: _shouldUpdateStakeholderData,
          _shouldUpdateCompanyData: _shouldUpdateCompanyData,
        });
      }

      if (verifyAccountMeta.isSuccess) {
        if (!storeFields._willSetUpOneTimeInvestments && storeFields._willSetUpRecurringInvestment) {
          moveToNextStep();
        }

        if (!verifyAccountMeta?.data?.requiredActions?.length) {
          if (!verifyAccountMeta.data?.canUserContinueTheInvestment && !verifyAccountMeta.data?.isAccountVerified) {
            startInvestmentCallback();
          }

          return moveToNextStep();
        }

        //TODO: this if should be upgrade in RELEASE-5
        // if (accountIsBanned) {
        //   return setIsBannedAccount(false);
        // }

        if (!verifyAccountMeta.data?.canUserContinueTheInvestment && !verifyAccountMeta.data?.isAccountVerified) {
          const shouldUpdateProfileData = verifyAccountMeta.data?.requiredActions?.filter(
            //TODO: this if should be upgrade in RELEASE-5
            requiredAction =>
              requiredAction?.onObject.type === VerificationObjectType.Profile &&
              requiredAction.action !== ActionName.RequireManualReview &&
              requiredAction.action !== ActionName.BanProfile &&
              requiredAction.action !== ActionName.BanAccount,
          );

          const shouldUpdateStakeholderData = verifyAccountMeta.data?.requiredActions?.filter(
            //TODO: this if should be upgrade in RELEASE-5
            requiredAction =>
              requiredAction?.onObject.type === VerificationObjectType.Stakeholder &&
              requiredAction.action !== ActionName.RequireManualReview &&
              requiredAction.action !== ActionName.BanProfile &&
              requiredAction.action !== ActionName.BanAccount,
          );

          const shouldUpdateCompanyData = verifyAccountMeta.data?.requiredActions?.filter(
            //TODO: this if should be upgrade in RELEASE-5
            requiredAction =>
              requiredAction?.onObject.type === VerificationObjectType.Company &&
              requiredAction.action !== ActionName.RequireManualReview &&
              requiredAction.action !== ActionName.BanProfile &&
              requiredAction.action !== ActionName.BanAccount,
          );

          const _shouldUpdateProfileDetails = !!shouldUpdateProfileData?.length;
          const _shouldUpdateCompanyData = !!shouldUpdateCompanyData?.length;
          const _shouldUpdateStakeholderData = !!shouldUpdateStakeholderData?.length || _shouldUpdateCompanyData;
          const _shouldUpdateData = _shouldUpdateProfileDetails || _shouldUpdateStakeholderData || _shouldUpdateCompanyData;

          setShouldUpdateProfileDetails(_shouldUpdateProfileDetails);
          setShouldUpdateStakeholderData(_shouldUpdateStakeholderData);
          setShouldUpdateCompanyData(_shouldUpdateCompanyData);

          updateStoreFieldsAsync({ _shouldUpdateProfileDetails, _shouldUpdateStakeholderData, _shouldUpdateCompanyData });

          if (shouldUpdateStakeholderData || shouldUpdateCompanyData) {
            refetchCorporate();
          }

          if (!_shouldUpdateData && getInvestmentSummaryMeta.data) {
            const { investmentFees } = getInvestmentSummaryMeta.data;

            if (!investmentFees?.value && investmentId) {
              startInvestmentMutate({ investmentId, approveFees: !verifyAccountMeta.data.canUserContinueTheInvestment });
              refetchGetInvestmentSummary();
            }
          }

          if (storeFields._willSetUpRecurringInvestment && !getInvestmentSummaryMeta.isLoading) {
            initiateRecurringInvestments();
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verifyAccountMeta.isSuccess]);

    useEffect(() => {
      if (getInvestmentSummaryMeta.isSuccess) {
        updateStoreFields({ investmentFees: getInvestmentSummaryMeta.data?.investmentFees });
      }
    }, [getInvestmentSummaryMeta, updateStoreFields]);

    useEffect(() => {
      if (!isCorporateRefetching && getCorporateData && storeFields._shouldUpdateStakeholderData) {
        const { details } = getCorporateData;
        const stakeholdersToStoreFields = details?.stakeholders ? formatStakeholdersForStorage(details?.stakeholders as Stakeholder[]) : [];
        updateStoreFields({ companyMajorStakeholderApplicants: stakeholdersToStoreFields, _shouldUpdateStakeholderData: true });
      }
    }, [isCorporateRefetching, getCorporateData, updateStoreFields, storeFields]);

    useEffect(() => {
      if (startInvestmentMeta.isSuccess) {
        refetchAccountStats();
        moveToNextStep();
      }
    }, [startInvestmentMeta.isSuccess, moveToNextStep, refetchAccountStats]);

    const onSubmit = async () => {
      if (shouldUpdateProfileDetails) {
        await updateProfileDetailsCallback();
      }

      if (shouldUpdateCompanyData || shouldUpdateStakeholderData) {
        await updateCorporateDetailsCallback();
      }

      moveToNextStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        {((verifyAccountMeta.isLoading && !verifyAccountMeta.data) ||
          (startInvestmentMeta.isLoading && !startInvestmentMeta.data) ||
          abortInvestmentMeta.isLoading) && (
          <FormContent willLeaveContentOnTop={!!storeFields._forInitialInvestment}>
            <div className="flex flex-col gap-32">
              <div className="flex w-full flex-col items-center gap-16">
                <IconSpinner />

                <Typography variant="paragraph-large">{SUBTITLE}</Typography>
              </div>

              <ModalTitle title={TITLE} />
            </div>
          </FormContent>
        )}
        {verifyAccountMeta.data && !verifyAccountMeta.data.isAccountVerified && shouldUpdateData && (
          <>
            <FormContent>
              <div className="flex flex-col gap-32">
                <div className="flex w-full flex-col items-center gap-16">
                  <IconXCircle />
                </div>

                <ModalTitle
                  title="We could not verify your information"
                  subtitle="Please update your information and we will run our verification process again."
                />
              </div>
            </FormContent>
            <ButtonStack>
              <Button
                label="Edit Information"
                variant="default"
                type="submit"
              />
            </ButtonStack>
          </>
        )}
      </Form>
    );
  },
};
