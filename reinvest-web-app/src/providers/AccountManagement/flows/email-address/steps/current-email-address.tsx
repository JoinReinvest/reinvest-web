import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { useAccountManagement } from 'providers/AccountManagement';
import { useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { ButtonBack } from '../../../../../components/ButtonBack';
import { Typography } from '../../../../../components/Typography';
import { useAuth } from '../../../../../providers/AuthProvider';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Update Email Address';
const TITLE = 'Your email address';

export const StepCurrentEmailAddress: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_EMAIL_ADDRESS,

  Component: ({ moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { user } = useAuth();
    const { handleSubmit, formState } = useForm({ mode: 'onSubmit' });
    const { setCurrentFlowIdentifier } = useAccountManagement();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const onSubmit = async () => {
      moveToNextStep();
    };

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>

            <Typography
              variant="paragraph-emphasized"
              className="flex flex-col"
            >
              {user?.attributes?.email}
            </Typography>
          </div>
        </FormContent>
        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
