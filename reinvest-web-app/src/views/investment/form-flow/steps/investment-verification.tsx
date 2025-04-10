import { IconSpinner } from 'assets/icons/IconSpinner';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useOneTimeInvestment } from 'providers/OneTimeInvestment';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useUserProfile } from 'providers/UserProfile';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useAbortInvestment } from 'reinvest-app-common/src/services/queries/abortInvestment';
import { useGetAccountStats } from 'reinvest-app-common/src/services/queries/getAccountStats';
import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';
import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { useStartInvestment } from 'reinvest-app-common/src/services/queries/startInvestment';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { AccountType, ActionName, DomicileType, Stakeholder, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { formatStakeholdersForStorage } from 'views/onboarding/form-flow/utilities';

import { IconCircleWarning } from '../../../../assets/icons/IconCircleWarning';
import { GetHelpLink } from '../../../../components/Links/GetHelp';
import { EMAILS } from '../../../../constants/urls';
import { useModalHandler } from '../../providers/ModalHandler';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const PLACEHOLDER = '{}';
const TITLE = 'We are verifying your investment.';
const SUBTITLE = 'Verifying';

const TITLE_FEES = `Notice: ${PLACEHOLDER} fee for manual verification`;
const SUBTITLE_FEES = 'As your verification has failed twice, REINVEST needs to run a manual verification.';

type KycFlags = Pick<FlowFields, '_shouldUpdateProfileDetails' | '_shouldUpdateCompanyData' | '_shouldUpdateStakeholderData'>;

export const StepInvestmentVerification: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_VERIFICATION,

  isAValidationView: true,

  Component: ({ moveToNextStep, updateStoreFields, storeFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const { investmentId } = useOneTimeInvestment();
    const { mutateAsync, ...verifyAccountMeta } = useVerifyAccount(getApiClient);
    const { mutateAsync: startInvestmentMutate, ...startInvestmentMeta } = useStartInvestment(getApiClient);
    const { refetch: refetchAccountStats } = useGetAccountStats(getApiClient, { accountId: activeAccount?.id || '', config: { enabled: false } });
    const { mutateAsync: abortInvestmentMutate, ...abortInvestmentMeta } = useAbortInvestment(getApiClient);
    const {
      data: investment,
      refetch: refetchGetInvestmentSummary,
      ...getInvestmentSummaryMeta
    } = useGetInvestmentSummary(getApiClient, {
      investmentId: investmentId || '',
      config: { enabled: false },
    });
    const { onModalLastStep } = useModalHandler();
    const { recurringInvestment, initiateRecurringInvestment, initiateRecurringInvestmentMeta } = useRecurringInvestment();
    const { userProfile } = useUserProfile();
    const [shouldUpdateProfileDetails, setShouldUpdateProfileDetails] = useState(false);
    const [shouldUpdateStakeholderData, setShouldUpdateStakeholderData] = useState(false);
    const [shouldUpdateCompanyData, setShouldUpdateCompanyData] = useState(false);
    const [shouldManualVerification, setShouldManualVerification] = useState(false);
    const shouldUpdateData = shouldUpdateProfileDetails || shouldUpdateStakeholderData || shouldUpdateCompanyData;
    const [isAccountBanned, setIsAccountBanned] = useState(false);

    const {
      refetch: refetchCorporate,
      isRefetching: isCorporateRefetching,
      data: getCorporateData,
    } = useGetCorporateAccount(getApiClient, { accountId: activeAccount?.id || '', config: { enabled: false } });

    const titleInvestmentFees = useMemo(() => {
      const fees = investment?.investmentFees?.formatted ?? '';

      return TITLE_FEES.replace(PLACEHOLDER, fees);
    }, [investment?.investmentFees?.formatted]);

    const startInvestmentCallback = useCallback(async () => {
      if (investmentId && storeFields._willSetUpOneTimeInvestments) {
        await startInvestmentMutate({ investmentId, approveFees: !verifyAccountMeta?.data?.canUserContinueTheInvestment });
      }

      if (storeFields._willSetUpRecurringInvestment && activeAccount?.id) {
        (await recurringInvestment) && (await initiateRecurringInvestment());
      }

      await refetchAccountStats();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

        await updateStoreFields({ name, dateOfBirth, residency, identificationDocuments, domicile, ssn, _address: address, _shouldUpdateProfileDetails: true });
      }
    }, [updateStoreFields, userProfile]);

    const updateCorporateDetailsCallback = useCallback(async () => {
      if (!isCorporateRefetching && getCorporateData) {
        const { details } = getCorporateData;
        const stakeholdersToStoreFields = details?.stakeholders ? formatStakeholdersForStorage(details?.stakeholders as Stakeholder[]) : [];
        const stakeholders = {
          companyMajorStakeholderApplicants: activeAccount?.type === AccountType.Corporate ? stakeholdersToStoreFields : undefined,
          trustTrusteesGrantorsOrProtectors: activeAccount?.type === AccountType.Trust ? stakeholdersToStoreFields : undefined,
        };
        await updateStoreFields({
          ...stakeholders,
          _shouldUpdateStakeholderData: true,
        });
      }
    }, [getCorporateData, isCorporateRefetching, updateStoreFields, activeAccount?.type]);

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
      async function updateKycFlags({ _shouldUpdateProfileDetails, _shouldUpdateStakeholderData, _shouldUpdateCompanyData }: KycFlags) {
        await updateStoreFields({
          _shouldUpdateProfileDetails: _shouldUpdateProfileDetails,
          _shouldUpdateStakeholderData: _shouldUpdateStakeholderData,
          _shouldUpdateCompanyData: _shouldUpdateCompanyData,
        });
      }

      if (verifyAccountMeta.isSuccess) {
        if (!verifyAccountMeta?.data?.requiredActions?.length) {
          if (verifyAccountMeta.data?.canUserContinueTheInvestment && verifyAccountMeta.data?.isAccountVerified) {
            startInvestmentCallback();
          }

          return moveToNextStep();
        }

        const accountIsBanned = verifyAccountMeta.data?.requiredActions?.some(requiredAction => requiredAction?.action === ActionName.BanAccount);

        if (accountIsBanned) {
          return setIsAccountBanned(true);
        }

        if (!verifyAccountMeta.data?.canUserContinueTheInvestment && !verifyAccountMeta.data?.isAccountVerified) {
          const shouldUpdateProfileData = verifyAccountMeta.data?.requiredActions?.filter(
            requiredAction => requiredAction?.onObject.type === VerificationObjectType.Profile && requiredAction.action !== ActionName.RequireManualReview,
          );

          const shouldUpdateStakeholderData = verifyAccountMeta.data?.requiredActions?.filter(
            requiredAction => requiredAction?.onObject.type === VerificationObjectType.Stakeholder && requiredAction.action !== ActionName.RequireManualReview,
          );

          const shouldUpdateCompanyData = verifyAccountMeta.data?.requiredActions?.filter(
            requiredAction => requiredAction?.onObject.type === VerificationObjectType.Company && requiredAction.action !== ActionName.RequireManualReview,
          );

          const _shouldUpdateProfileDetails = !!shouldUpdateProfileData?.length;
          const _shouldUpdateCompanyData = !!shouldUpdateCompanyData?.length;
          const _shouldUpdateStakeholderData = !!shouldUpdateStakeholderData?.length || _shouldUpdateCompanyData;
          const _shouldUpdateData = _shouldUpdateProfileDetails || _shouldUpdateStakeholderData || _shouldUpdateCompanyData;

          setShouldUpdateProfileDetails(_shouldUpdateProfileDetails);
          setShouldUpdateStakeholderData(_shouldUpdateStakeholderData);
          setShouldUpdateCompanyData(_shouldUpdateCompanyData);
          updateKycFlags({ _shouldUpdateProfileDetails, _shouldUpdateStakeholderData, _shouldUpdateCompanyData });

          if (shouldUpdateStakeholderData || shouldUpdateCompanyData) {
            refetchCorporate();
          }

          if (!_shouldUpdateData) {
            refetchGetInvestmentSummary();
          }
        }

        if (verifyAccountMeta.data.canUserContinueTheInvestment && storeFields._shouldAgreeToOneTimeInvestment) {
          refetchGetInvestmentSummary();
        }

        if (verifyAccountMeta.data.canUserContinueTheInvestment && storeFields._shouldAgreeToRecurringInvestment) {
          startInvestmentCallback();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verifyAccountMeta.isSuccess]);

    useEffect(() => {
      if (initiateRecurringInvestmentMeta.isSuccess) {
        moveToNextStep();
      }
    }, [initiateRecurringInvestmentMeta.isSuccess, moveToNextStep]);

    useEffect(() => {
      async function initiateRecurringInvestments() {
        if (activeAccount?.id) {
          (await recurringInvestment) && (await initiateRecurringInvestment());
        }
      }
      async function startInvestments() {
        if (investmentId) {
          await startInvestmentMutate({ investmentId, approveFees: !verifyAccountMeta?.data?.canUserContinueTheInvestment });
        }

        if (storeFields._willSetUpRecurringInvestment) {
          await initiateRecurringInvestments();
        }
      }

      if (getInvestmentSummaryMeta.isSuccess) {
        const investmentFees = investment?.investmentFees;

        if (investmentFees) {
          updateStoreFields({ investmentFees: investment?.investmentFees });

          return setShouldManualVerification(true);
        }

        if (verifyAccountMeta?.data?.canUserContinueTheInvestment) {
          startInvestments();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getInvestmentSummaryMeta.isSuccess, verifyAccountMeta?.data]);

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

    const acceptInvestmentFees = async () => {
      await startInvestmentCallback();
    };

    const handleAbortInvestment = async () => {
      if (investmentId) {
        await abortInvestmentMutate({ investmentId });
      }

      onModalLastStep && onModalLastStep();
    };

    const onSubmit = async () => {
      if (shouldUpdateProfileDetails) {
        await updateProfileDetailsCallback();
      }

      if (shouldUpdateCompanyData || shouldUpdateStakeholderData) {
        await updateCorporateDetailsCallback();
      }

      moveToNextStep();
    };

    if (isAccountBanned && !verifyAccountMeta.isLoading && !startInvestmentMeta.isLoading && !abortInvestmentMeta.isLoading) {
      return (
        <Form>
          <FormContent>
            <div className="flex flex-col gap-32">
              <div className="flex w-full flex-col items-center gap-16">
                <IconXCircle />
              </div>

              <ModalTitle
                title="Verification failed. Your account has been locked."
                subtitle={
                  <p>
                    Please reach out to <GetHelpLink label={EMAILS.support} />
                  </p>
                }
              />
            </div>
          </FormContent>
        </Form>
      );
    }

    const verificationKycTitle = storeFields._secondFailedVerifyKyc ? 'We still are unable to verify your information' : 'We could not verify your information';

    return (
      <Form onSubmit={onSubmit}>
        {((verifyAccountMeta.isLoading && !verifyAccountMeta.data) ||
          (startInvestmentMeta.isLoading && !startInvestmentMeta.data) ||
          abortInvestmentMeta.isLoading) &&
          !shouldManualVerification && (
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
        {verifyAccountMeta.data && !verifyAccountMeta.data.isAccountVerified && shouldUpdateData && !shouldManualVerification && (
          <>
            <FormContent>
              <div className="flex flex-col gap-32">
                <div className="flex w-full flex-col items-center gap-16">
                  <IconXCircle />
                </div>

                <ModalTitle
                  title={verificationKycTitle}
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
        {!verifyAccountMeta.isLoading && !startInvestmentMeta.isLoading && !abortInvestmentMeta.isLoading && shouldManualVerification && (
          <>
            <FormContent>
              <div className="flex flex-col gap-32">
                <div className="flex w-full flex-col items-center gap-16">
                  <IconCircleWarning />
                </div>

                <ModalTitle
                  title={titleInvestmentFees}
                  subtitle={SUBTITLE_FEES}
                />
              </div>
            </FormContent>
            <ButtonStack>
              <Button
                label="Submit"
                variant="default"
                onClick={acceptInvestmentFees}
              />
              <Button
                label="Cancel"
                variant="outlined"
                className="text-green-frost-01"
                onClick={handleAbortInvestment}
              />
            </ButtonStack>
          </>
        )}
      </Form>
    );
  },
};
