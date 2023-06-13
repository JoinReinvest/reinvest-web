import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { ButtonBack } from '../../../../../components/ButtonBack';
import { Typography } from '../../../../../components/Typography';
import { useFlowsManager } from '../../../contexts/flows-manager';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Remove account';
const TITLE = 'Remove Account';

export const StepRemoveAccount: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.REMOVE_ACCOUNT,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { handleSubmit, formState } = useForm<FlowFields>({ mode: 'onSubmit' });
    const { setCurrentFlowIdentifier } = useFlowsManager();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const onSubmit: SubmitHandler<FlowFields> = async () => {
      //TODO: Add connection with API
      updateStoreFields({ _hasSucceded: true });
      moveToNextStep();
    };

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-24">
            <Typography variant="h5">{TITLE}</Typography>
            <div>
              <Typography variant="paragraph-emphasized">Account Value</Typography>
              <p className="text-48 leading-90">$500.00</p>
            </div>
            <Typography variant="paragraph-large">Are you sure you’d like to remove Nellie Brewer as an account beneficiary?</Typography>
            <Typography variant="paragraph-large">Removing Nellie Brewer will re-allocate all their investments into your main account.</Typography>
          </div>
        </FormContent>
        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
            variant="error"
          />
        </ButtonStack>
      </Form>
    );
  },
};
