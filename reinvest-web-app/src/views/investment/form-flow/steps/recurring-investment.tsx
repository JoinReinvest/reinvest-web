import { IconRecurrent } from 'assets/icons/IconRecurrent';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { useToggler } from 'hooks/toggler';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Would you like to set up a recurring investment?';
const SUBTITLE =
  'Regular contributions can help your investments grow over time. By scheduling a recurring investment, you can take advantage of the power of compound interest and watch your wealth accumulate.';

export const StepRecurringInvestment: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_INVESTMENT,

  willBePartOfTheFlow: fields => !!fields._shouldDisplayRecurringInvestment,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._selectedAccount, fields.investmentAmount !== undefined];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const [isLoading, toggleIsLoading] = useToggler(false);

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      toggleIsLoading(true);
      await updateStoreFields({ _willSetUpRecurringInvestment: true, _shouldAgreeToRecurringInvestment: true });

      toggleIsLoading(false);
      moveToNextStep();
    };

    const onSkipButtonClick = async () => {
      toggleIsLoading(true);
      await updateStoreFields({ _willSetUpRecurringInvestment: false, _shouldAgreeToRecurringInvestment: false });

      toggleIsLoading(false);
      moveToNextStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <div className="flex w-full justify-center">
            <IconRecurrent />
          </div>

          <ModalTitle
            title={TITLE}
            subtitle={SUBTITLE}
            isTitleCenteredOnMobile={false}
          />
        </FormContent>

        <ButtonStack useRowOnLgScreen>
          <Button
            label="Skip"
            variant="outlined"
            disabled={isLoading}
            onClick={onSkipButtonClick}
          />

          <Button
            type="submit"
            label="Continue"
            disabled={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
