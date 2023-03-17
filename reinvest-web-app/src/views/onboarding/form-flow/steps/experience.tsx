import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { Title } from 'components/Title';
import { EXPERIENCES_AS_OPTIONS } from 'constants/experiences';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import { AccountType, Experience } from 'types/graphql';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'experience'>;

const schema = z.object({
  experience: z.enum([Experience.VeryExperienced, Experience.Expert, Experience.NoExperience, Experience.SomeExperience]),
});

export const StepExperience: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EXPERIENCE,

  willBePartOfTheFlow(fields) {
    return fields.accountType === AccountType.Individual;
  },
  doesMeetConditionFields(fields) {
    const requiredFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
      fields.socialSecurityNumber,
    ];

    return fields.accountType === AccountType.Individual && allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    const onSkip = () => {
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title title="What is your experience with real estate investment?" />

        <SelectionCards
          name="experience"
          control={control}
          options={EXPERIENCES_AS_OPTIONS}
          orientation="vertical"
          required
        />

        <Button
          type="submit"
          label="Continue"
          disabled={shouldButtonBeDisabled}
        />

        <Button
          label="Skip"
          variant="outlined"
          onClick={onSkip}
        />
      </Form>
    );
  },
};
