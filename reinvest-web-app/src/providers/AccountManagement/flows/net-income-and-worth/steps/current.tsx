import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEvent, useMemo } from 'react';
import { NET_WORTHS_AS_OPTIONS } from 'reinvest-app-common/src/constants/net-worths';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'Your Net Worth and Income';
const BUTTON_LABEL = 'Update';

export const StepCurrent: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT,

  Component: ({ moveToNextStep, storeFields }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useAccountManagement();

    const { netIncome, netWorth } = useMemo(() => {
      const netWorthValue = storeFields?.netWorth;
      const netIncomeValue = storeFields?.netIncome;

      const netWorth = NET_WORTHS_AS_OPTIONS.find(option => option.value === netWorthValue)?.label;
      const netIncome = NET_WORTHS_AS_OPTIONS.find(option => option.value === netIncomeValue)?.label;

      return {
        netWorth,
        netIncome,
      };
    }, [storeFields]);

    function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      moveToNextStep();
    }

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>

            <Typography
              variant="h6"
              className="flex flex-col"
            >
              <span>{netWorth}</span>
              <span>{netIncome}</span>
            </Typography>
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
          />
        </ButtonStack>
      </Form>
    );
  },
};
