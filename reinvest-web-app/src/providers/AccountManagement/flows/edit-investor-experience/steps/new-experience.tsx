import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EXPERIENCES_AS_OPTIONS } from 'reinvest-app-common/src/constants/experiences';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Experience } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { ButtonBack } from '../../../../../components/ButtonBack';
import { SelectionCards } from '../../../../../components/FormElements/SelectionCards';
import { Typography } from '../../../../../components/Typography';
import { useUserProfile } from '../../../../UserProfile';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Confirm';
const TITLE = 'Update your experience';

type Fields = FlowFields;

const schema = z.object({
  newExperience: z.enum([Experience.VeryExperienced, Experience.Expert, Experience.NoExperience, Experience.SomeExperience]),
});

export const StepNewExperience: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.NEW_EXPERIENCE,

  Component: ({ moveToNextStep, updateStoreFields, moveToPreviousStep, storeFields }: StepComponentProps<FlowFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });
    const { updateUserProfile, updateUserProfileMeta } = useUserProfile();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || updateUserProfileMeta.isLoading;
    const onSubmit: SubmitHandler<Fields> = async ({ newExperience }) => {
      await updateUserProfile({ investingExperience: { experience: newExperience } });
      await updateStoreFields({ newExperience, _hasSucceded: true });
    };

    useEffect(() => {
      if (updateUserProfileMeta.isSuccess) {
        updateUserProfileMeta.reset();
        moveToNextStep();
      }
    }, [updateUserProfileMeta, moveToNextStep]);

    const onButtonBackClick = () => {
      moveToPreviousStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>
            <SelectionCards
              name="newExperience"
              control={control}
              options={EXPERIENCES_AS_OPTIONS}
              className="flex flex-col items-stretch justify-center gap-22 lg:gap-24"
              orientation="vertical"
              required
              forWhiteBackground
            />
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
