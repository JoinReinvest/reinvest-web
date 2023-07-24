import { IconSpinner } from 'assets/icons/IconSpinner';
import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useToggler } from 'hooks/toggler';
import { useActiveAccountConfiguration } from 'providers/ActiveAccountConfigurationProvider';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { FormEventHandler, useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Opt in for automatic dividend reinvesting?';
const MESSAGE_INFORMATION = 'What is automatic dividend reinvesting?';

export const StepAutomaticDividend: StepParams<FlowFields> = {
  identifier: Identifiers.AUTOMATIC_DIVIDENT_REINVESTMENT,

  doesMeetConditionFields: fields => {
    return !fields.optsInForAutomaticDividendReinvestment && !fields._onlyRecurringInvestment;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const [isLoading, toggleIsLoading] = useToggler(false);
    const { activeAccount } = useActiveAccount();
    const { hasAutomaticDividendsActive, activeAccountConfigurationMeta, automaticDividendsMeta, updateHasAutomaticDividendsActive } =
      useActiveAccountConfiguration();

    const onSkipButtonClick = async () => {
      toggleIsLoading(true);
      await updateStoreFields({ optsInForAutomaticDividendReinvestment: false });

      toggleIsLoading(false);
      moveToNextStep();
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      toggleIsLoading(true);

      if (activeAccount?.id) {
        await updateHasAutomaticDividendsActive(true);

        await updateStoreFields({ optsInForAutomaticDividendReinvestment: true });
      }

      toggleIsLoading(false);
      moveToNextStep();
    };

    useEffect(() => {
      async function updateStore() {
        if (automaticDividendsMeta.isSuccess && hasAutomaticDividendsActive) {
          updateStoreFields({ optsInForAutomaticDividendReinvestment: true });
          moveToNextStep();
        }
      }

      updateStore();
    }, [automaticDividendsMeta.isSuccess, hasAutomaticDividendsActive, updateStoreFields, moveToNextStep]);

    function onButtonBackClick() {
      moveToPreviousStep();
    }

    return (
      <Form onSubmit={onSubmit}>
        {activeAccountConfigurationMeta.isLoading && (
          <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
            <IconSpinner />
          </div>
        )}

        {!activeAccountConfigurationMeta.isLoading && (
          <FormContent willLeaveContentOnTop={!!storeFields._forInitialInvestment}>
            {!!storeFields._forInitialInvestment && (
              <ButtonBack
                hideOnMobile
                onClick={onButtonBackClick}
              />
            )}

            <div className="flex flex-col gap-36">
              <Typography variant="h5">{TITLE}</Typography>

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
        )}

        <ButtonStack>
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
