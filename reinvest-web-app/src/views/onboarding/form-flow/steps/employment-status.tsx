import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EMPLOYMENT_STATUSES, EMPLOYMENT_STATUSES_VALUES } from 'reinvest-app-common/src/constants/employment_statuses';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'employmentStatus'>;

const schema = z.object({
  employmentStatus: z.enum(EMPLOYMENT_STATUSES_VALUES),
});

export const StepEmploymentStatus: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_STATUS,

  willBePartOfTheFlow(fields) {
    const hasCompletedProfileCreation = !!fields.isCompletedProfile;
    const isAccountIndividual = fields.accountType === DraftAccountType.Individual;

    return isAccountIndividual && hasCompletedProfileCreation;
  },

  doesMeetConditionFields(fields) {
    const profileFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
      fields.ssn,
      fields.address,
      fields.isAccreditedInvestor,
      fields.experience,
    ];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const hasCompletedProfileCreation = !!fields.isCompletedProfile;
    const isAccountIndividual = fields.accountType === DraftAccountType.Individual;

    return (isAccountIndividual && hasProfileFields) || (isAccountIndividual && hasCompletedProfileCreation);
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
        <FormContent>
          <BlackModalTitle title="Are you currently employed?" />

          {individualDraftAccountError && <FormMessage message={individualDraftAccountError.message} />}
          <SelectionCards
            name="employmentStatus"
            control={form.control}
            options={EMPLOYMENT_STATUSES}
            required={false}
            orientation="vertical"
            className="flex flex-col items-stretch gap-22 lg:gap-24"
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={isLoading}
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
