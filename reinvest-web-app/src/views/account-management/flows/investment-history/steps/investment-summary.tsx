import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { InvestmentDetail } from '../components/InvestmentDetail';
import { INVESTMENT_STATUS_THAT_ALLOW_CANCELLATION } from '../constants';
import { FlowStepIdentifiers } from '../enums';
import { useInvestmentSummary } from '../hooks/investment-summary';
import { FlowFields } from '../interfaces';
import { formatInvestmentStatus, formatTradeId, getInvestmentDetails } from '../utilities';

const BUTTON_LABEL = 'Cancel Transaction';

export const StepInvestmentSummary: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.INVESTMENT_SUMMARY,

  doesMeetConditionFields: fields => {
    return !!fields._selectedInvesmentId;
  },

  Component: ({ storeFields, updateStoreFields, moveToPreviousStep, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const investmentId = storeFields._selectedInvesmentId ?? '';
    const { investment } = useInvestmentSummary({ investmentId });

    async function onButtonBackClick() {
      await updateStoreFields({ _selectedInvesmentId: undefined });
      moveToPreviousStep();
    }

    async function onCancelTransactionClick() {
      // TO-DO: Implement cancel transaction logic once the API is ready.
      if (investment && investment.amount.formatted) {
        const tradeId = investment.tradeId;
        const amountFormatted = investment.amount.formatted;

        await updateStoreFields({ _willCancelInvestment: true, _cancelledInvestmentDetails: { tradeId, amountFormatted } });
        moveToNextStep();
      }
    }

    if (!investment) {
      return (
        <div className="grid h-full place-items-center">
          <IconSpinner />
        </div>
      );
    }

    const tradeLabel = formatTradeId(investment.tradeId);
    const status = formatInvestmentStatus(investment.status);
    const details = getInvestmentDetails(investment);
    const isCancellable = INVESTMENT_STATUS_THAT_ALLOW_CANCELLATION.includes(investment.status);

    return (
      <div className="grid h-full grid-cols-1 grid-rows-full-auto justify-between gap-16">
        <div className="flex h-full flex-col gap-24">
          <ButtonBack onClick={onButtonBackClick} />

          <section className="flex h-full flex-col gap-16">
            <header className="flex flex-col gap-12">
              <Typography variant="h5">{tradeLabel}</Typography>
              <Typography
                variant="h6"
                className="capitalize text-gray-02"
              >
                {status}
              </Typography>
            </header>

            <dl className="flex flex-col gap-16">
              {details.map(({ label, value }, index) => {
                const isLastIndex = index === details.length - 1;

                return (
                  <>
                    <InvestmentDetail
                      key={label}
                      title={label}
                      value={value}
                    />

                    {!isLastIndex && <Separator />}
                  </>
                );
              })}
            </dl>
          </section>
        </div>

        {isCancellable && (
          <ButtonStack>
            <Button
              variant="outlined-red"
              label={BUTTON_LABEL}
              onClick={onCancelTransactionClick}
            />
          </ButtonStack>
        )}
      </div>
    );
  },
};
