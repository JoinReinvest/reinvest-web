import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useCurrentBankAccount } from 'hooks/current-bank-account';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { RecurringInvestmentStatus } from 'reinvest-app-common/src/types/graphql';

import { useFlowsManager } from '../../../contexts/FlowsManager';
import { BankDetails } from '../components/BankDetails';
import { RecurringInvestmentDetails } from '../components/RecurringInvestmentDetails';
import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'Recurring Investment';
const BUTTON_CANCEL_LABEL = 'Cancel Transaction';
const BUTTON_REINSTATE_LABEL = 'Reinstate';

export const StepCurrentRecurringInvestment: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_RECURRING_INVESTMENT,

  doesMeetConditionFields: fields => {
    return !!fields.activeRecurringInvestment?.id;
  },

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useFlowsManager();
    const { currentBankAccount, currentBankAccountMeta } = useCurrentBankAccount();

    const { deactivateRecurringInvestment, deactivateRecurringInvestmentMeta, unsuspendRecurringInvestment, unsuspendRecurringInvestmentMeta } =
      useRecurringInvestment();

    useEffect(() => {
      async function validateSuccess() {
        if (deactivateRecurringInvestmentMeta.isSuccess || unsuspendRecurringInvestmentMeta.isSuccess) {
          moveToNextStep();
        }
      }

      validateSuccess();
    }, [deactivateRecurringInvestmentMeta.isSuccess, unsuspendRecurringInvestmentMeta.isSuccess, moveToNextStep]);

    const activeRecurringInvestment = storeFields?.activeRecurringInvestment;

    const shouldCancelButtonBeLoading = deactivateRecurringInvestmentMeta.isLoading;
    const shouldReinstateButtonBeLoading = unsuspendRecurringInvestmentMeta.isLoading;

    const shouldButtonBeDisabled = currentBankAccountMeta.isLoading || shouldCancelButtonBeLoading || shouldReinstateButtonBeLoading;

    const willDisplayCancelButton = activeRecurringInvestment?.status === RecurringInvestmentStatus.Active;
    const willDisplayReinstateButton = activeRecurringInvestment?.status === RecurringInvestmentStatus.Suspended;

    async function onCancelRecurringInvestment() {
      await updateStoreFields({ _action: 'cancel' });
      await deactivateRecurringInvestment();
    }

    async function onReinstateRecurringInvestment() {
      await updateStoreFields({ _action: 'reinstate' });
      await unsuspendRecurringInvestment();
    }

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />

          <div className="flex flex-col gap-24">
            <Typography variant="h5">{TITLE}</Typography>

            <Typography
              variant="h6"
              className="text-gray-02"
            >
              From
            </Typography>

            <BankDetails bankAccount={currentBankAccount} />

            <RecurringInvestmentDetails activeRecurringInvestment={activeRecurringInvestment ?? null} />
          </div>
        </FormContent>

        <ButtonStack>
          {willDisplayCancelButton && (
            <Button
              onClick={onCancelRecurringInvestment}
              label={BUTTON_CANCEL_LABEL}
              disabled={shouldButtonBeDisabled}
              loading={shouldCancelButtonBeLoading}
              variant="outlined-red"
            />
          )}

          {willDisplayReinstateButton && (
            <Button
              onClick={onReinstateRecurringInvestment}
              loading={shouldReinstateButtonBeLoading}
              label={BUTTON_REINSTATE_LABEL}
              disabled={shouldButtonBeDisabled}
            />
          )}
        </ButtonStack>
      </Form>
    );
  },
};
