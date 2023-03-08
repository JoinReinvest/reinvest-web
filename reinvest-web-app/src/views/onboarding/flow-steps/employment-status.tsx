import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { Title } from 'components/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';
import { ComponentProps } from 'react';
import { SelectionCards } from 'components/FormElements/SelectionCards';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

const EMPLOYMENT_STATUS: ComponentProps<typeof SelectionCards>['options'] = [
  {
    title: 'Employed',
    value: 'employed',
  },
  {
    title: 'Unemployed',
    value: 'unemployed',
  },
  {
    title: 'Retired',
    value: 'retired',
  },
  {
    title: 'Student',
    value: 'student',
  },
];

type Fields = Pick<OnboardingFormFields, 'employmentStatus'>;

const schema = z.object({
  employmentStatus: z.enum(['employed', 'unemployed', 'retired', 'student']),
});

export const StepEmploymentStatus: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_STATUS,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const form = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    const onSkip = () => {
      updateStoreFields({ employmentStatus: undefined });
      moveToNextStep();
    };

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Title title="Are you currently employed?" />

        <SelectionCards
          name="employmentStatus"
          control={form.control}
          options={EMPLOYMENT_STATUS}
          required={false}
          orientation="vertical"
          className="flex flex-col items-stretch gap-22"
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
