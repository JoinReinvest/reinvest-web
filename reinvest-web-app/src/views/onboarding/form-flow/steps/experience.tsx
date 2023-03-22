import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { EXPERIENCES_AS_OPTIONS } from 'constants/experiences';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'experience'>;

const schema = z.object({
  experience: z.enum(['no-experience', 'some-experience', 'very-experienced', 'expert']),
});

export const StepExperience: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EXPERIENCE,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === 'INDIVIDUAL';
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    const onSkip = () => {
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="What is your experience with real estate investment?" />

          <SelectionCards
            name="experience"
            control={control}
            options={EXPERIENCES_AS_OPTIONS}
            className="flex flex-col items-stretch justify-center gap-22 lg:gap-24"
            orientation="vertical"
            required
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />

          <Button
            label="Skip"
            variant="outlined"
            onClick={onSkip}
            className="text-green-frost-01"
          />
        </ButtonStack>
      </Form>
    );
  },
};
