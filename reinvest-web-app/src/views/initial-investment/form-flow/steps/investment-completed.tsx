import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InvestmentInformation } from 'components/InvestmentInformation';
import { Typography } from 'components/Typography';
import { FormEventHandler, useEffect, useState } from 'react';
import { RECURRING_INVESTMENT_INTERVAL_LABELS } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';

import { IconSpinner } from '../../../../assets/icons/IconSpinner';
import { getApiClient } from '../../../../services/getApiClient';
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
    const [amountFromApi, setAmountFromApi] = useState('');
    const { onModalLastStep } = useModalHandler();
    const { refetch, isSuccess, isRefetching, data } = useGetInvestmentSummary(getApiClient, {
      investmentId: storeFields.investmentId || '',
      config: { enabled: false },
    });

    const recurrentInvestmentInterval =
      storeFields.recurringInvestmentInterval && RECURRING_INVESTMENT_INTERVAL_LABELS.get(storeFields.recurringInvestmentInterval);
    const recurrentInvestmentLabel = `Recurring ${recurrentInvestmentInterval} Investment`;

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      await updateStoreFields({ _hasCompletedInvestment: true });
      onModalLastStep && onModalLastStep();
    };

    useEffect(() => {
      if (isSuccess && data) {
        setAmountFromApi(data.amount.formatted || '');
      }
    }, [isSuccess, data]);

    useEffect(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Form onSubmit={onSubmit}>
        {isRefetching && (
          <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
            <IconSpinner />
          </div>
        )}
        {!isRefetching && isSuccess && (
          <FormContent>
            <div className="flex flex-col gap-40">
              <Typography
                variant="h5-larger"
                className="text-center"
              >
                {TITLE}
              </Typography>

              <div className="flex flex-col gap-32">
                {amountFromApi && (
                  <InvestmentInformation
                    amount={amountFromApi}
                    type={storeFields.oneTimeInvestment ? 'one-time' : 'recurring'}
                    date={new Date()}
                    label={storeFields.oneTimeInvestment ? 'One Time Investment' : recurrentInvestmentLabel}
                  />
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
        )}
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
