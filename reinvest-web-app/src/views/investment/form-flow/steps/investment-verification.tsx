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

import { IconCircleWarning } from '../../../../assets/icons/IconCircleWarning';
import { useInvestmentContext } from '../../../../providers/InvestmentProvider';
import { BannedView } from '../../../BannedView';
import { useModalHandler } from '../../providers/modal-handler';
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
    const { onModalLastStep } = useModalHandler();
    const { mutateAsync, ...verifyAccountMeta } = useVerifyAccount(getApiClient);
    const { mutateAsync: startInvestmentMutate, ...startInvestmentMeta } = useStartInvestment(getApiClient);
    const { refetch: refetchAccountStats } = useGetAccountStats(getApiClient, { accountId: activeAccount?.id || '', config: { enabled: false } });
    const { mutateAsync: abortInvestmentMutate, ...abortInvestmentMeta } = useAbortInvestment(getApiClient);
    const { refetch: refetchGetInvestmentSummary, ...getInvestmentSummaryMeta } = useGetInvestmentSummary(getApiClient, {
      investmentId: investmentId || '',
      config: { enabled: false },
    });
    const { recurringInvestment, initiateRecurringInvestment, initiateRecurringInvestmentMeta } = useRecurringInvestment();
    const [isBannedAccount, setIsBannedAccount] = useState(false);
    const { userProfile } = useActiveAccount();
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

    useEffect(() => {
      async function initiateInvestments() {
        if (activeAccount?.id) {
          await mutateAsync({ accountId: activeAccount.id });
          (await recurringInvestment) && (await initiateRecurringInvestment());
        }
      }

      initiateInvestments();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (verifyAccountMeta.isSuccess) {
        if (!verifyAccountMeta?.data?.requiredActions?.length) {
          if (!verifyAccountMeta.data?.canUserContinueTheInvestment && !verifyAccountMeta.data?.isAccountVerified) {
            startInvestmentCallback();
          }

          return moveToNextStep();
        }

        const accountIsBanned = verifyAccountMeta.data?.requiredActions?.find(requiredAction => requiredAction?.action === ActionName.BanAccount);

        //TODO: this if should be upgrade in RELEASE-5
        if (accountIsBanned) {
          return setIsBannedAccount(false);
        }

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

          updateStoreFields({
            _shouldUpdateProfileDetails: !!shouldUpdateProfileData?.length,
            _shouldUpdateStakeholderData: !!shouldUpdateStakeholderData?.length || !!shouldUpdateCompanyData?.length,
            _shouldUpdateCompanyData: !!shouldUpdateCompanyData?.length,
          });

          if (shouldUpdateStakeholderData || shouldUpdateCompanyData) {
            refetchCorporate();
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verifyAccountMeta.isSuccess, initiateRecurringInvestmentMeta.isSuccess]);

    useEffect(() => {
      if (verifyAccountMeta.isSuccess) {
        refetchGetInvestmentSummary();
      }
    }, [refetchGetInvestmentSummary, verifyAccountMeta.isSuccess]);

    useEffect(() => {
      if (getInvestmentSummaryMeta.isSuccess) {
        updateStoreFields({ investmentFees: getInvestmentSummaryMeta.data?.investmentFees });
      }
    }, [getInvestmentSummaryMeta, updateStoreFields]);

    useEffect(() => {
      if (getInvestmentSummaryMeta.data && verifyAccountMeta.data) {
        const { investmentFees } = getInvestmentSummaryMeta.data;
        const { canUserContinueTheInvestment } = verifyAccountMeta.data;

        if (canUserContinueTheInvestment && !investmentFees?.value && investmentId) {
          startInvestmentMutate({ investmentId: investmentId, approveFees: true });
        }
      }
    }, [getInvestmentSummaryMeta.data, investmentId, startInvestmentMutate, verifyAccountMeta.data]);

    useEffect(() => {
      if (userProfile && storeFields._shouldUpdateProfileDetails) {
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

        updateStoreFields({ name, dateOfBirth, residency, identificationDocuments, domicile, ssn, address, _shouldUpdateProfileDetails: true });
      }
    }, [userProfile, updateStoreFields, storeFields]);

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

    const onSubmit = () => {
      moveToNextStep();
    };

    const abortInvestmentOnClick = async () => {
      if (investmentId) {
        await abortInvestmentMutate({ investmentId: investmentId });
      }

      onModalLastStep && onModalLastStep();
    };

    const startInvestmentOnClick = async () => {
      if (investmentId) {
        await startInvestmentMutate({ investmentId: investmentId, approveFees: true });
        onModalLastStep && onModalLastStep();
      }
    };

    const investmentFees = storeFields.investmentFees?.formatted || '$10';

    if (isBannedAccount) {
      return (
        <BannedView
          isOpen
          title="Verification failed. Your account has been locked."
        />
      );
    }

    return (
      <Form onSubmit={onSubmit}>
        {((verifyAccountMeta.isLoading && !verifyAccountMeta.data) ||
          (startInvestmentMeta.isLoading && !startInvestmentMeta.data) ||
          abortInvestmentMeta.isLoading) && (
          <FormContent willLeaveContentOnTop={!storeFields._forInitialInvestment}>
            <div className="flex flex-col gap-32">
              <div className="flex w-full flex-col items-center gap-16">
                <IconSpinner />

                <Typography variant="paragraph-large">{SUBTITLE}</Typography>
              </div>

              <ModalTitle title={TITLE} />
            </div>
          </FormContent>
        )}
        {verifyAccountMeta.data &&
          !verifyAccountMeta.data.isAccountVerified &&
          (storeFields._shouldUpdateCompanyData || storeFields._shouldUpdateProfileDetails || storeFields._shouldUpdateStakeholderData) && (
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
        {!storeFields._shouldUpdateCompanyData &&
          !storeFields._shouldUpdateProfileDetails &&
          !storeFields._shouldUpdateStakeholderData &&
          !verifyAccountMeta.isLoading &&
          !startInvestmentMeta.isLoading &&
          !abortInvestmentMeta.isLoading && (
            <>
              <FormContent>
                <div className="flex flex-col gap-32">
                  <div className="flex w-full flex-col items-center gap-16">
                    <IconCircleWarning />
                  </div>

                  <ModalTitle
                    title={`Notice: ${investmentFees} fee for manual verification`}
                    subtitle="As your verification has failed twice, REINVEST needs to run a manual verification."
                  />
                </div>
              </FormContent>
              <ButtonStack>
                <Button
                  label="Submit"
                  variant="default"
                  onClick={startInvestmentOnClick}
                />
                <Button
                  label="Cancel"
                  variant="outlined"
                  className="text-green-frost-01"
                  onClick={abortInvestmentOnClick}
                />
              </ButtonStack>
            </>
          )}
      </Form>
    );
  },
};
