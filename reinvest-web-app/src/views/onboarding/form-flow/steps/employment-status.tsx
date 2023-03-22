import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { Title } from 'components/Title';
import { EMPLOYMENT_STATUSES } from 'constants/employment_statuses';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { DraftAccountType } from 'types/graphql';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'employmentStatus'>;

const schema = z.object({
  employmentStatus: z.enum(['EMPLOYED', 'UNEMPLOYED', 'RETIRED', 'STUDENT']),
});

export const StepEmploymentStatus: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_STATUS,

  willBePartOfTheFlow(fields) {
    return fields.accountType === DraftAccountType.Individual;
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
      fields.address,
      fields.isAccreditedInvestor,
      fields.experience,
    ];

    return fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const form = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const {
      isLoading,
      updateData,
      error: { individualDraftAccountError },
      isSuccess,
    } = useUpdateDataIndividualOnboarding();

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      await updateData(Identifiers.EMPLOYMENT_STATUS, { ...storeFields, ...form.getValues() });
    };

    const onSkip = () => {
      updateStoreFields({ employmentStatus: undefined });
      moveToNextStep();
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Title title="Are you currently employed?" />

        {individualDraftAccountError && <FormMessage message={individualDraftAccountError.message} />}

        <SelectionCards
          name="employmentStatus"
          control={form.control}
          options={EMPLOYMENT_STATUSES}
          required={false}
          orientation="vertical"
          className="gap-22 flex flex-col items-stretch"
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
