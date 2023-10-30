import { IconSpinner } from 'assets/icons/IconSpinner';
import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InvestmentInformation } from 'components/InvestmentInformation';
import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';
import { useOneTimeInvestment } from 'providers/OneTimeInvestment';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { FormEventHandler } from 'react';
import { RECURRING_INVESTMENT_INTERVAL_LABELS } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useAccountManagement } from '../../../../providers/AccountManagement';
import { useModalHandler } from '../../providers/ModalHandler';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Thank you for investing in Community REIT';
const MESSAGE_INFORMATION = 'Please expect funds to be drawn from your bank account within 3 days.';
const BUTTON_LABEL_FALLBACK = 'Continue';
const BUTTON_LABEL_ONLY_RECURRING_INVESTMENT = 'Dashboard';

export const StepInvestmentCompleted: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_COMPLETED,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const shouldAgreeWithOneTimeInvestmentAgreement = fields._shouldAgreeToOneTimeInvestment ? !!fields.agreesToOneTimeInvestment : true;
    const shouldAgreeWithRecurringInvestmentAgreement = fields._shouldAgreeToRecurringInvestment ? !!fields.agreesToRecurringInvestment : true;
    const requiredFields = [shouldAgreeWithOneTimeInvestmentAgreement, shouldAgreeWithRecurringInvestmentAgreement];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const { createInvestmentMeta, investmentSummaryMeta, investmentSummary } = useOneTimeInvestment();
    const { initiateRecurringInvestmentMeta, recurringInvestment } = useRecurringInvestment();
    const { onModalLastStep } = useModalHandler();
    const { onModalOpenChange } = useAccountManagement();

    const onlyRecurringInvestment = !!storeFields?._onlyRecurringInvestment;
    const oneTimeInvestmentAmount = investmentSummary?.amount?.formatted;
    const recurringInvestmentAmount = recurringInvestment?.amount?.formatted;
    const recurrentInvestmentInterval =
      storeFields.recurringInvestmentInterval && RECURRING_INVESTMENT_INTERVAL_LABELS.get(storeFields.recurringInvestmentInterval);
    const recurrentInvestmentLabel = `Recurring ${recurrentInvestmentInterval} Investment`;
    const buttonLabel = onlyRecurringInvestment ? BUTTON_LABEL_ONLY_RECURRING_INVESTMENT : BUTTON_LABEL_FALLBACK;

    const showSeparator = storeFields._willSetUpRecurringInvestment && storeFields._willSetUpOneTimeInvestments;

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();

      createInvestmentMeta.reset();
      initiateRecurringInvestmentMeta.reset();

      onModalLastStep && onModalLastStep();
      onModalOpenChange(false);
    };

    return (
      <Form onSubmit={onSubmit}>
        {investmentSummaryMeta.isLoading && storeFields._willSetUpOneTimeInvestments && (
          <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
            <IconSpinner />
          </div>
        )}

        <FormContent willLeaveContentOnTop={!!storeFields?._forInitialInvestment}>
          <div className="flex flex-col gap-40">
            <Typography
              variant="h5-larger"
              className="text-center"
            >
              {TITLE}
            </Typography>

            <div className="flex flex-col gap-32">
              <div className="flex flex-col gap-32">
                {oneTimeInvestmentAmount && !onlyRecurringInvestment && (
                  <InvestmentInformation
                    amount={oneTimeInvestmentAmount}
                    type="one-time"
                    date={new Date()}
                    label="One Time Investment"
                  />
                )}

                {showSeparator && <Separator />}

                {storeFields._willSetUpRecurringInvestment && recurringInvestmentAmount && storeFields.recurringInvestment?.date && (
                  <InvestmentInformation
                    amount={recurringInvestmentAmount}
                    type="recurring"
                    date={storeFields.recurringInvestment.date}
                    label={recurrentInvestmentLabel}
                  />
                )}
              </div>

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
            label={buttonLabel}
          />
        </ButtonStack>
      </Form>
    );
  },
};
