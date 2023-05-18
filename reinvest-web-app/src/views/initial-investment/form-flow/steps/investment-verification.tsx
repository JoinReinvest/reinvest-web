import { IconSpinner } from 'assets/icons/IconSpinner';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { ActionName, DomicileType, Stakeholder, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';

import { IconXCircle } from '../../../../assets/icons/IconXCircle';
import { Button } from '../../../../components/Button';
import { ButtonStack } from '../../../../components/FormElements/ButtonStack';
import { formatStakeholdersForStorage } from '../../../onboarding/form-flow/utilities';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'We are verifying your investment.';
const SUBTITLE = 'Verifying';

export const StepInvestmentVerification: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_VERIFICATION,

  isAValidationView: true,

  Component: ({ moveToNextStep, updateStoreFields, storeFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const { mutate, isSuccess, data, isLoading } = useVerifyAccount(getApiClient);
    const { refetch: refetchUserProfile, isRefetching: isGetProfileRefetching, data: getUserProfileData } = useGetUserProfile(getApiClient);
    const {
      refetch: refetchCorporate,
      isRefetching: isCorporateRefetching,
      data: getCorporateData,
    } = useGetCorporateAccount(getApiClient, { accountId: activeAccount?.id || '', config: { enabled: false } });

    useEffect(() => {
      if (activeAccount?.id) {
        mutate({ accountId: activeAccount.id });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isSuccess) {
        if (!data?.requiredActions?.length) {
          return moveToNextStep();
        }

        if (!data?.canUserContinueTheInvestment && !data?.isAccountVerified) {
          const shouldUpdateProfileData = data?.requiredActions?.filter(
            requiredAction => requiredAction?.onObject.type === VerificationObjectType.Profile && requiredAction.action !== ActionName.RequireManualReview,
          );

          const shouldUpdateStakeholderData = data?.requiredActions?.filter(
            requiredAction => requiredAction?.onObject.type === VerificationObjectType.Stakeholder && requiredAction.action !== ActionName.RequireManualReview,
          );

          const shouldUpdateCompanyData = data?.requiredActions?.filter(
            requiredAction => requiredAction?.onObject.type === VerificationObjectType.Company && requiredAction.action !== ActionName.RequireManualReview,
          );

          updateStoreFields({
            _shouldUpdateProfileDetails: !!shouldUpdateProfileData?.length,
            _shouldUpdateStakeholderData: !!shouldUpdateStakeholderData?.length || !!shouldUpdateCompanyData?.length,
            _shouldUpdateCompanyData: !!shouldUpdateCompanyData?.length,
          });

          if (shouldUpdateProfileData) {
            refetchUserProfile();
          }

          if (shouldUpdateStakeholderData) {
            refetchCorporate();
          }
        }

        if (data?.isAccountVerified || data?.canUserContinueTheInvestment) {
          moveToNextStep();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    useEffect(() => {
      if (!isGetProfileRefetching && getUserProfileData && storeFields._shouldUpdateProfileDetails) {
        const { details } = getUserProfileData;
        const name = { firstName: details?.firstName || '', lastName: details?.lastName || '', middleName: details?.middleName || '' };
        const address = details?.address;
        const dateOfBirth = details?.dateOfBirth;
        const identificationDocuments: DocumentFile[] = details?.idScan?.map(idScan => ({ id: idScan?.id, fileName: idScan?.fileName })) || [];
        const residency = details?.domicile?.type;
        const domicile = details?.domicile || { type: DomicileType.Citizen, visaType: '', birthCountry: '', citizenshipCountry: '' };

        updateStoreFields({ name, address, dateOfBirth, residency, identificationDocuments, domicile, _shouldUpdateProfileDetails: true });
      }
    }, [isGetProfileRefetching, getUserProfileData, updateStoreFields, storeFields]);

    useEffect(() => {
      if (!isCorporateRefetching && getCorporateData && storeFields._shouldUpdateStakeholderData) {
        const { details } = getCorporateData;
        const stakeholdersToStoreFields = details?.stakeholders ? formatStakeholdersForStorage(details?.stakeholders as Stakeholder[]) : [];
        updateStoreFields({ companyMajorStakeholderApplicants: stakeholdersToStoreFields, _shouldUpdateStakeholderData: true });
      }
    }, [isCorporateRefetching, getCorporateData, updateStoreFields, storeFields]);

    const onSubmit = () => {
      moveToNextStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        {isLoading && !data && (
          <FormContent>
            <div className="flex flex-col gap-32">
              <div className="flex w-full flex-col items-center gap-16">
                <IconSpinner />

                <Typography variant="paragraph-large">{SUBTITLE}</Typography>
              </div>

              <ModalTitle title={TITLE} />
            </div>
          </FormContent>
        )}
        {data && !data.isAccountVerified && (
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
