import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { WarningMessage } from 'components/ModalElements/WarningMessage';
import { Typography } from 'components/Typography';
import { useActiveAccountConfiguration } from 'providers/ActiveAccountConfigurationProvider';
import { FormEventHandler, useEffect, useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useFlowsManager } from '../../../contexts/FlowsManager';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';
import { getStatusValue } from '../utilities';

const TITLE = 'Automatic Dividend Reinvesting';
const STATUS_LABEL = 'Current Status:';
const INFORMATION_MESSAGE = 'What is automatic dividend reinvesting?';
const BUTTON_AGREE_LABEL = 'Opt in';
const BUTTON_DISAGREE_LABEL = 'Opt out';

export const StepOptIn: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.OPT_IN,

  Component: ({ storeFields, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { updateHasAutomaticDividendsActive, automaticDividendsMeta } = useActiveAccountConfiguration();
    const { setCurrentFlowIdentifier } = useFlowsManager();
    const [shouldButtonBeLoading, setShouldButtonBeLoading] = useState({ aggree: false, disagree: false });

    useEffect(() => {
      if (automaticDividendsMeta.isSuccess) {
        setCurrentFlowIdentifier(null);
        automaticDividendsMeta.reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [automaticDividendsMeta.isSuccess]);

    const onButtonBack = () => {
      setCurrentFlowIdentifier(null);
    };

    const onDisagree = async () => {
      setShouldButtonBeLoading({ aggree: false, disagree: true });
      await updateStoreFields({ willOptIn: false });
      await updateHasAutomaticDividendsActive(false);
      setShouldButtonBeLoading({ aggree: false, disagree: false });
    };

    const onAgree: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      setShouldButtonBeLoading({ aggree: true, disagree: false });

      await updateStoreFields({ willOptIn: true });
      await updateHasAutomaticDividendsActive(true);
      setShouldButtonBeLoading({ aggree: false, disagree: false });
    };

    const shouldButtonBeDisabled = automaticDividendsMeta.isLoading;
    const statusValue = getStatusValue(!!storeFields.willOptIn);
    const status = [STATUS_LABEL, statusValue].join(' ');

    return (
      <Form onSubmit={onAgree}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            disabled={shouldButtonBeDisabled}
            onClick={onButtonBack}
          />

          <div className="flex flex-col gap-16">
            <Typography variant="h5">{TITLE}</Typography>

            <Typography variant="paragraph-emphasized-regular">{status}</Typography>

            <WarningMessage
              message={INFORMATION_MESSAGE}
              modalColor="white"
              withoutMarginBottom
            />
          </div>

          {automaticDividendsMeta.error && <ErrorMessagesHandler error={automaticDividendsMeta.error} />}
        </FormContent>

        <ButtonStack>
          <Button
            variant="outlined"
            label={BUTTON_DISAGREE_LABEL}
            onClick={onDisagree}
            disabled={shouldButtonBeDisabled}
            loading={shouldButtonBeLoading.disagree}
          />

          <Button
            type="submit"
            label={BUTTON_AGREE_LABEL}
            disabled={shouldButtonBeDisabled}
            loading={shouldButtonBeLoading.aggree}
          />
        </ButtonStack>
      </Form>
    );
  },
};
