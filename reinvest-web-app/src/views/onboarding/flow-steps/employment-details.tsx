import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { Title } from 'components/Title';
import { Input } from 'components/FormElements/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';
import { Select } from 'components/Select';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'employmentDetails'>;

const schema = z.object({
  employmentDetails: z.object({
    employerName: z.string().min(1),
    occupation: z.string().min(1),
    industry: z.string().min(1),
  }),
});

export const StepEmploymentDetails: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_STATUS,

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
      updateStoreFields({ employmentStatus: undefined });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title title="Are you currently employed?" />

        <Input
          name="employmentDetails.employerName"
          control={control}
          placeholder="Name of Employer"
          required
        />

        <Input
          name="employmentDetails.occupation"
          control={control}
          placeholder="Title"
          required
        />

        <Select
          name="employmentDetails.industry"
          control={control}
          options={[]}
          placeholder="Industry"
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
