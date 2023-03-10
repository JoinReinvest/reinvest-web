import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { Input } from 'components/FormElements/Input';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'name'>;

const schema = z.object({
  name: z.object({
    firstName: formValidationRules.firstName,
    middleName: formValidationRules.middleName,
    lastName: formValidationRules.lastName,
  }),
});

export const StepFullName: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.FULL_NAME,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const form = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { data, error, isLoading, updateData, isSuccess } = useUpdateDataIndividualOnboarding({ ...storeFields, ...form.getValues() });

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields({ ...fields, dateOfBirth: new Date('11/08/1971') });
      updateData();
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Title title="Enter your first and last name as it appears on your ID" />

        <Input
          name="name.firstName"
          control={form.control}
          placeholder="First Name"
          required
        />

        <Input
          name="name.middleName"
          control={form.control}
          placeholder="Middle Name (Optional)"
        />

        <Input
          name="name.lastName"
          control={form.control}
          placeholder="Last Name"
          required
        />

        <Button
          type="submit"
          label="Continue"
          disabled={shouldButtonBeDisabled}
          loading={isLoading}
        />
      </Form>
    );
  },
};
