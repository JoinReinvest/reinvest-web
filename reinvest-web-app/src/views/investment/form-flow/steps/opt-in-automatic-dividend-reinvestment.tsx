import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useToggler } from 'hooks/toggler';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Opt in for automatic dividend reinvesting?';
const MESSAGE_INFORMATION = 'What is automatic dividend reinvesting?';

export const StepOptInAutomaticDividendReinvestment: StepParams<FlowFields> = {
  identifier: Identifiers.OPT_IN_AUTOMATIC_DIVIDEND_REINVESTMENT,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._selectedAccount, fields.investmentAmount !== undefined];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const [isLoading, toggleIsLoading] = useToggler(false);

    const onSkipButtonClick = async () => {
      toggleIsLoading(true);
      await updateStoreFields({ optsInForAutomaticDividendReinvestment: false });

      toggleIsLoading(false);
      moveToNextStep();
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      toggleIsLoading(true);
      await updateStoreFields({ optsInForAutomaticDividendReinvestment: true });

      toggleIsLoading(false);
      moveToNextStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <div className="flex flex-col gap-36">
            <ModalTitle
              title={TITLE}
              isTitleCenteredOnMobile={false}
            />

            <div className="flex gap-8">
              <IconWarning className="stroke-black-01" />
              <Typography
                variant="paragraph"
                className="grow text-black-01"
              >
                {MESSAGE_INFORMATION}
              </Typography>
            </div>
          </div>
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
            label="Opt-in"
            disabled={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
