import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EMPLOYMENT_STATUSES, EMPLOYMENT_STATUSES_VALUES } from 'reinvest-app-common/src/constants/employment_statuses';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
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
      error: individualDraftAccountError,
      isLoading,
      mutateAsync: completeIndividualDraftAccountMutate,
      isSuccess,
    } = useCompleteIndividualDraftAccount(getApiClient);

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);

      if (storeFields.accountId && fields.employmentStatus) {
        await completeIndividualDraftAccountMutate({ accountId: storeFields.accountId, input: { employmentStatus: { status: fields.employmentStatus } } });
      }
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

          {individualDraftAccountError && <ErrorMessagesHandler error={individualDraftAccountError} />}
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
        </ButtonStack>
      </Form>
    );
  },
};
