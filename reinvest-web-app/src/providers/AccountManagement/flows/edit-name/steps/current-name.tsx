import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { useUserProfile } from 'providers/UserProfile';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Update Name';
const TITLE = 'Your name';

type Fields = Pick<FlowFields, 'name'>;

export const StepCurrentName: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_NAME,

  Component: ({ moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { userProfile } = useUserProfile();
    const { handleSubmit, formState } = useForm<Fields>({ mode: 'onSubmit' });
    const { setCurrentFlowIdentifier } = useAccountManagement();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const onSubmit: SubmitHandler<Fields> = async () => {
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
              variant="h6"
              className="flex flex-col"
            >
              {userProfile?.details?.firstName} {userProfile?.details?.middleName} {userProfile?.details?.lastName}
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
