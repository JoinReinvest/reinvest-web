import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { Input } from 'components/FormElements/Input';
import { Select } from 'components/Select';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { INDUESTRIES_AS_OPTIONS, INDUSTRIES_VALUES } from 'reinvest-app-common/src/constants/industries';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { DraftAccountType, EmploymentStatus } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'employmentDetails'>;

const schema = z.object({
  employmentDetails: z.object({
    employerName: formValidationRules.employerName,
    occupation: formValidationRules.occupation,
    industry: z.enum(INDUSTRIES_VALUES),
  }),
});

export const StepEmploymentDetails: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_DETAILS,

  willBePartOfTheFlow(fields) {
    const hasCompletedProfileCreation = !!fields.isCompletedProfile;
    const isAccountIndividual = fields.accountType === DraftAccountType.Individual;
    const isEmployed = fields.employmentStatus === EmploymentStatus.Employed;
    const meetsBaseRequirements = isAccountIndividual && isEmployed;

    return meetsBaseRequirements || (meetsBaseRequirements && hasCompletedProfileCreation);
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
      fields.employmentStatus,
    ];

    const hasCompletedProfileCreation = !!fields.isCompletedProfile;
    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isAccountIndividual = fields.accountType === DraftAccountType.Individual;
    const isEmployed = fields.employmentStatus === EmploymentStatus.Employed;
    const meetsBaseRequirements = isAccountIndividual && isEmployed;

    return (meetsBaseRequirements && hasProfileFields) || (meetsBaseRequirements && hasCompletedProfileCreation);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const {
      error: individualDraftAccountError,
      isLoading,
      mutateAsync: completeIndividualDraftAccountMutate,
      isSuccess,
    } = useCompleteIndividualDraftAccount(getApiClient);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      const { employmentDetails } = fields;
      await updateStoreFields(fields);

      if (storeFields.accountId && employmentDetails?.employerName && employmentDetails?.occupation && employmentDetails?.industry) {
        await completeIndividualDraftAccountMutate({
          accountId: storeFields.accountId,
          input: { employer: { nameOfEmployer: employmentDetails.employerName, title: employmentDetails.occupation, industry: employmentDetails.industry } },
        });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="Where are you employed?" />
          {individualDraftAccountError && <FormMessage message={individualDraftAccountError.message} />}
          <div className="flex w-full flex-col gap-16">
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
              options={INDUESTRIES_AS_OPTIONS}
              placeholder="Industry"
              required
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
