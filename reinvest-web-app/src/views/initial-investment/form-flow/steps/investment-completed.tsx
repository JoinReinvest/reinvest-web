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
const MESSAGE_INFORMATION = 'Please expect funds to be drawn from your bank account within 3 days.';

export const StepInvestmentCompleted: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_COMPLETED,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const shouldAgreeWithOneTimeInvestmentAgreement = fields._shouldAgreeToOneTimeInvestment ? !!fields.agreesToOneTimeInvestment : true;
    const shouldAgreeWithRecurringInvestmentAgreement = fields._shouldAgreeToRecurringInvestment ? !!fields.agreesToRecurringInvestment : true;

    const requiredFields = [
      !!fields.oneTimeInvestment,
      fields.optsInForAutomaticDividendReinvestment !== undefined,
      fields._willSetUpRecurringInvestments !== undefined,
      shouldAgreeWithOneTimeInvestmentAgreement,
      shouldAgreeWithRecurringInvestmentAgreement,
    ];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { onModalLastStep } = useModalHandler();
    const oneTimeInvestment = storeFields.oneTimeInvestment;
    const recurrentInvestment = storeFields.recurringInvestment;

    const recurrentInvestmentInterval =
      storeFields.recurringInvestmentInterval && RECURRING_INVESTMENT_INTERVAL_LABELS.get(storeFields.recurringInvestmentInterval);
    const recurrentInvestmentLabel = `Recurring ${recurrentInvestmentInterval} Investment`;

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      await updateStoreFields({ _hasCompletedInvestment: true });
      onModalLastStep && onModalLastStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent>
          <div className="flex flex-col gap-40">
            <Typography
              variant="h5-custom"
              className="text-center"
            >
              {TITLE}
            </Typography>

            <div className="flex flex-col gap-32">
              {oneTimeInvestment && oneTimeInvestment.amount !== undefined && (
                <InvestmentInformation
                  amount={oneTimeInvestment.amount}
                  type="one-time"
                  date={oneTimeInvestment.date || new Date()}
                  label="One Time Investment"
                />
              )}

              {recurrentInvestment && recurrentInvestment.amount !== undefined && (
                <>
                  <Separator />

                  <InvestmentInformation
                    amount={recurrentInvestment.amount}
                    type="recurring"
                    date={recurrentInvestment.date || new Date()}
                    label={recurrentInvestmentLabel}
                  />
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
