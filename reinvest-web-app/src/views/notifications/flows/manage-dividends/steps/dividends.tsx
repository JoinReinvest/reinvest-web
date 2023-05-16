import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { FormEventHandler } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { DividendAction, FlowFields } from '../interfaces';
import { FlowStepIdentifiers } from '../step-identifiers';

const TITLE = 'Manage Dividends';
const AMOUNT_LABEL = 'Dividend Amount';
const MESSAGE = 'Make a decision on whether to reinvest or withdraw your dividend. If you take no action within (30) days, your dividend will be reinvested. ';
const BUTTON_DISAGREE_LABEL = 'Withdraw';
const BUTTON_AGREE_LABEL = 'Reinvest';

export const StepDividends: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.MANAGE_DIVIDENDS,

  Component: ({ updateStoreFields, storeFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const amountMasked = storeFields._amountMasked;

    const onDisagree = async () => {
      await updateStoreFields({ action: DividendAction.WITHDRAW_FUNDS });
      moveToNextStep();
    };

    const onAgree: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      await updateStoreFields({ action: DividendAction.REINVEST_FUNDS });
      moveToNextStep();
    };

    return (
      <Form
        onSubmit={onAgree}
        className="pb-24"
      >
        <FormContent
          className="!gap-24"
          willLeaveContentOnTop
        >
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
