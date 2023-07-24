import { IconRecurrent } from 'assets/icons/IconRecurrent';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { useToggler } from 'hooks/toggler';
import { FormEventHandler } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useModalHandler } from 'views/investment/providers/ModalHandler';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Would you like to set up a recurring investment?';
const SUBTITLE =
  'Regular contributions can help your investments grow over time. By scheduling a recurring investment, you can take advantage of the power of compound interest and watch your wealth accumulate.';

export const StepRecurringInvestment: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_INVESTMENT,

  willBePartOfTheFlow: fields => {
    return !!fields._shouldDisplayRecurringInvestment || !!fields._onlyRecurringInvestment;
  },

  doesMeetConditionFields: fields => {
    return !!fields._shouldDisplayRecurringInvestment || !!fields._onlyRecurringInvestment;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const { onModalLastStep } = useModalHandler();
    const [isLoading, toggleIsLoading] = useToggler(false);
    const willShowOnlyRecurringInvestment = !!storeFields._onlyRecurringInvestment;

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

    function onButtonBackClick() {
      if (willShowOnlyRecurringInvestment) {
        onModalLastStep && onModalLastStep();
      } else {
        moveToPreviousStep();
      }
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop={!!storeFields._forInitialInvestment}>
          {!!storeFields._forInitialInvestment && (
            <ButtonBack
              hideOnMobile
              onClick={onButtonBackClick}
            />
          )}

          <div className="flex w-full justify-center">
            <IconRecurrent />
          </div>

          <ModalTitle
            title={TITLE}
            subtitle={SUBTITLE}
          />
        </FormContent>

        <ButtonStack>
          {!willShowOnlyRecurringInvestment && (
            <Button
              label="I’ll do this later"
              variant="outlined"
              disabled={isLoading}
              onClick={onSkipButtonClick}
            />
          )}

          <Button
            type="submit"
            label="Continue"
            disabled={isLoading}
            loading={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
