import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { COMPANY_STATEMENT, FINRA_STATEMENT, NONE_STATEMENT, POLITICAL_STATEMENT } from 'constants/compliances';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEvent } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { CheckboxDisplay } from '../components/CheckboxDisplay';
import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const BUTTON_LABEL = 'Update';
const TITLE = 'You Compliance statements';

export const StepCurrentCompliance: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_COMPLIANCE,

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useAccountManagement();

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

            <CheckboxDisplay isChecked={!!storeFields?.compliances?.isAssociatedWithFinra}>{FINRA_STATEMENT}</CheckboxDisplay>

            <CheckboxDisplay isChecked={!!storeFields?.compliances?.isAssociatedWithPubliclyTradedCompany}>{COMPANY_STATEMENT}</CheckboxDisplay>

            <CheckboxDisplay isChecked={!!storeFields?.compliances?.isSeniorPoliticalFigure}>{POLITICAL_STATEMENT}</CheckboxDisplay>

            <CheckboxDisplay isChecked={!!storeFields?.compliances?.doNoneApply}>{NONE_STATEMENT}</CheckboxDisplay>
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
