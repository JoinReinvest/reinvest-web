import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InvestmentInformation } from 'components/InvestmentInformation';
import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';
import { FormEventHandler } from 'react';
import { RECURRING_INVESTMENT_INTERVAL_LABELS } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useModalHandler } from '../../providers/modal-handler';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Thank you for investing in Community REIT';
const MESSAGE_INFORMATION = 'Funds will appear on your dashboard immediately. Please expect funds to be withdrawn from your bank account in 3–5 business days.';

export const StepInvestmentCompleted: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_COMPLETED,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [
      fields._selectedAccount,
      fields.investmentAmount !== undefined,
      fields.approvesSubscriptionAgreement,
      fields._investmentWasSuccessful,
    ];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { onModalLastStep } = useModalHandler();
    const investmentAmount = storeFields.investmentAmount;
    const recurrentInvestment = generateRecurrentInvestment(storeFields);

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      await updateStoreFields({ _hasCompletedInvestment: true });
      onModalLastStep && onModalLastStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <div className="flex flex-col gap-40">
            <Typography
              variant="h5-larger"
              className="text-center"
            >
              {TITLE}
            </Typography>

            <div className="flex flex-col gap-32">
              {investmentAmount !== undefined && (
                <InvestmentInformation
                  amount={investmentAmount}
                  type="one-time"
                  label="Amount"
                />
              )}

              {recurrentInvestment && (
                <>
                  <Separator />

                  {recurrentInvestment}
                </>
              )}

              <div className="flex gap-8">
                <IconWarning className="stroke-gray-01" />
                <Typography
                  variant="paragraph"
                  className="grow text-gray-01"
                >
                  {MESSAGE_INFORMATION}
                </Typography>
              </div>
            </div>
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
          />
        </ButtonStack>
      </Form>
    );
  },
};

function generateRecurrentInvestment(storeFields: FlowFields) {
  const { recurringInvestmentAmount, recurringInvestmentDate, recurringInvestmentInterval, _shouldDisplayRecurringInvestment, _willSetUpRecurringInvestment } =
    storeFields;

  if (
    !!_shouldDisplayRecurringInvestment &&
    !!_willSetUpRecurringInvestment &&
    !!recurringInvestmentAmount &&
    recurringInvestmentDate &&
    recurringInvestmentInterval
  ) {
    const recurrentInvestmentInterval =
      storeFields.recurringInvestmentInterval && RECURRING_INVESTMENT_INTERVAL_LABELS.get(storeFields.recurringInvestmentInterval);
    const recurrentInvestmentLabel = `Recurring ${recurrentInvestmentInterval} Investment`;

    return (
      <InvestmentInformation
        amount={recurringInvestmentAmount}
        date={recurringInvestmentDate}
        type="recurring"
        label={recurrentInvestmentLabel}
      />
    );
  }

  return null;
}
