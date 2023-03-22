import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Select } from 'components/Select';
import { Title } from 'components/Title';
import { NET_WORTHS_AS_OPTIONS } from 'constants/net-worths';
import { formValidationRules } from 'formValidationRules';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { DraftAccountType, EmploymentStatus } from 'types/graphql';
import { WhyRequiredNetWorthModal } from 'views/whyRequiredModals/WhyRequiredNetWorthModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'netIncome' | 'netWorth'>;

const schema = z.object({
  netIncome: formValidationRules.netIncome,
  netWorth: formValidationRules.netWorth,
});

export const StepNetWorthAndIncome: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.NET_WORTH_AND_INCOME,

  willBePartOfTheFlow(fields) {
    return fields.employmentStatus === EmploymentStatus.Employed;
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
      fields.socialSecurityNumber,
      fields.experience,
    ];

    const individualAccountFields = [fields.employmentStatus, fields.employmentDetails];

    return (
      (fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(profileFields) && !fields.isCompletedProfile) ||
      (allRequiredFieldsExists(individualAccountFields) && !!fields.isCompletedProfile)
    );
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
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

    const [isWhyRequiredOpen, setIsWhyRequiredOpen] = useState(false);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      updateData(Identifiers.NET_WORTH_AND_INCOME, { ...storeFields, ...fields });
    };

    const openWhyReqiredOnClick = () => setIsWhyRequiredOpen(!isWhyRequiredOpen);

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title title="What is approximate net worth and income?" />

        {isWhyRequiredOpen && (
          <WhyRequiredNetWorthModal
            isOpen={isWhyRequiredOpen}
            onOpenChange={openWhyReqiredOnClick}
          />
        )}

        {individualDraftAccountError && <FormMessage message={individualDraftAccountError.message} />}
        <Select
          name="netIncome"
          control={control}
          options={NET_WORTHS_AS_OPTIONS}
          placeholder="Net Income"
          required
        />

        <Select
          name="netWorth"
          control={control}
          options={NET_WORTHS_AS_OPTIONS}
          placeholder="Net Worth"
          required
        />

        <OpenModalLink
          label="Required. Why?"
          green
          onClick={openWhyReqiredOnClick}
        />

        <Button
          type="submit"
          label="Continue"
          disabled={shouldButtonBeDisabled}
        />
      </Form>
    );
  },
};
