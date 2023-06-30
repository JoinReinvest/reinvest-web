import { IconSpinner } from 'assets/icons/IconSpinner';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AgreementStatus, FundsWithdrawalRequestStatus } from 'reinvest-app-common/src/types/graphql';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';
import { useFundsWithdrawalManager } from '../providers/FundsWithdrawal';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  isAValidationView: true,

  Component: ({ updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const { simulation, simulationMeta, fundsWithdrawalRequest, currentRequestMeta, subscriptionAgreement, currentAgreementMeta } = useFundsWithdrawalManager();

    useEffect(() => {
      async function moveToStepBasedOnState() {
        await updateStoreFields({ _canWithdrawFunds: !!simulation?.canWithdraw });

        if (!simulation?.canWithdraw) {
          moveToNextStep();

          return;
        }

        if (subscriptionAgreement?.status === AgreementStatus.WaitingForSignature) {
          moveToStepByIdentifier(FlowStepIdentifiers.SUBSCRIPTION_AGREEMENT);

          return;
        }

        if (fundsWithdrawalRequest?.status === FundsWithdrawalRequestStatus.Draft) {
          moveToStepByIdentifier(FlowStepIdentifiers.SUBSCRIPTION_AGREEMENT);

          return;
        }

        if (fundsWithdrawalRequest?.status === FundsWithdrawalRequestStatus.AwaitingDecision) {
          moveToStepByIdentifier(FlowStepIdentifiers.CONFIRMATION);

          return;
        }

        moveToNextStep();
      }

      if (simulationMeta?.isSuccess && !currentRequestMeta?.isLoading && !currentAgreementMeta?.isLoading) {
        moveToStepBasedOnState();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [simulationMeta?.isSuccess, currentRequestMeta?.isLoading, currentAgreementMeta?.isLoading, fundsWithdrawalRequest?.status]);

    return (
      <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
        <IconSpinner />
      </div>
    );
  },
};
