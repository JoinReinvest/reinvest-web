import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { useUserProfile } from 'providers/UserProfile';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EXPERIENCE_TITLES } from 'reinvest-app-common/src/constants/experiences';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Experience } from 'reinvest-app-common/src/types/graphql';

import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Update Experience';
const TITLE = 'Your actual experience';

type Fields = FlowFields;

export const StepCurrentExperience: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_EXPERIENCE,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { userProfile } = useUserProfile();
    const { handleSubmit, formState } = useForm<Fields>({ mode: 'onSubmit' });
    const { setCurrentFlowIdentifier } = useAccountManagement();
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({ _currentExperience: fields._currentExperience });
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
              {EXPERIENCE_TITLES[userProfile?.details?.experience ?? Experience.NoExperience]}
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
