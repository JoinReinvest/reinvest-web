import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEvent, useMemo } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';
import { getLabelsForDisplay } from '../utilities';

const TITLE = 'Current Domicile';
const BUTTON_LABEL = 'Update Domicile';

export const StepCurrentDomicile: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_DOMICILE,

  Component: ({ moveToNextStep, storeFields }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useAccountManagement();
    const fields = useMemo(() => getLabelsForDisplay(storeFields), [storeFields]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
              {fields.map((field, index) => (
                <span key={index}>{field}</span>
              ))}
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
