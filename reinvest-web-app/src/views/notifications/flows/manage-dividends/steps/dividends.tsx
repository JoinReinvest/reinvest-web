import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useManageDividends } from 'hooks/manage-dividends';
import { FormEventHandler, useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';

import { DividendAction } from '../../interfaces';
import { useFlow } from '../flow';
import { FlowFields } from '../interfaces';
import { FlowStepIdentifiers } from '../step-identifiers';

const TITLE = 'Manage Dividends';
const AMOUNT_LABEL = 'Dividend Amount';
const MESSAGE = 'Make a decision on whether to reinvest or withdraw your dividend. If you take no action within (30) days, your dividend will be reinvested. ';
const BUTTON_DISAGREE_LABEL = 'Withdraw';
const BUTTON_AGREE_LABEL = 'Reinvest';

export const StepDividends: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.MANAGE_DIVIDENDS,

  Component: ({ updateStoreFields, storeFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { resetStoreFields, moveToFirstStep } = useFlow();
    const { updateCurrentFlow } = useFlowsManagerContext();
    const { withdrawDividends, reinvestDividends, metaReinvestDividends, metaWithdrawDividends } = useManageDividends();

    useEffect(() => {
      if (metaReinvestDividends.isSuccess || metaWithdrawDividends.isSuccess) {
        moveToNextStep();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaReinvestDividends, metaWithdrawDividends]);

    const shouldButtonBeLoading = metaReinvestDividends.isLoading || metaWithdrawDividends.isLoading;
    const dividendId = storeFields._dividendId;
    const amountMasked = storeFields._amountMasked;

    const onDisagree = async () => {
      if (dividendId) {
        await updateStoreFields({ action: DividendAction.WITHDRAW_FUNDS });
        await withdrawDividends({ dividendIds: [dividendId] });
      }
    };

    const onAgree: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();

      if (dividendId) {
        await updateStoreFields({ action: DividendAction.REINVEST_FUNDS });
        await reinvestDividends({ dividendIds: [dividendId] });
      }
    };

    async function onButtonBackClick() {
      updateCurrentFlow({ identifier: null });
      await resetStoreFields();
      moveToFirstStep();
    }

    return (
      <Form
        onSubmit={onAgree}
        className="pb-24"
      >
        <FormContent
          className="!gap-24"
          willLeaveContentOnTop
        >
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldButtonBeLoading}
          />

          <Typography variant="h5">{TITLE}</Typography>

          <div className="flex flex-col gap-8">
            <Typography variant="paragraph-emphasized-regular">{AMOUNT_LABEL}</Typography>

            <Typography variant="custom-1">{amountMasked}</Typography>
          </div>

          <Typography
            variant="paragraph-large"
            className="text-black-01/60"
          >
            {MESSAGE}
          </Typography>
        </FormContent>

        <ButtonStack useRowOnLgScreen>
          <Button
            label={BUTTON_DISAGREE_LABEL}
            onClick={onDisagree}
            variant="outlined"
          />

          <Button
            label={BUTTON_AGREE_LABEL}
            type="submit"
          />
        </ButtonStack>
      </Form>
    );
  },
};
