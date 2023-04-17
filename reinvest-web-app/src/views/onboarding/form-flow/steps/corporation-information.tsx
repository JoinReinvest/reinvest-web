import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Select } from 'components/Select';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CORPORATION_ANNUAL_REVENUE_AS_OPTIONS,
  CORPORATION_ANNUAL_REVENUES,
  CORPORATION_NUMBER_OF_EMPLOYEES,
  CORPORATION_NUMBER_OF_EMPLOYEES_AS_OPTIONS,
} from 'reinvest-app-common/src/constants/corporation';
import { INDUESTRIES_AS_OPTIONS, INDUSTRIES_VALUES } from 'reinvest-app-common/src/constants/industries';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'corporationAnnualRevenue' | 'corporationNumberOfEmployees' | 'corporationIndustry'>;

const schema = z.object({
  corporationAnnualRevenue: z.enum(CORPORATION_ANNUAL_REVENUES),
  corporationNumberOfEmployees: z.enum(CORPORATION_NUMBER_OF_EMPLOYEES),
  corporationIndustry: z.enum(INDUSTRIES_VALUES),
});

export const StepCorporationInformation: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_INFORMATION,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isTrustAccount = fields.accountType === DraftAccountType.Trust;
    const hasTrustFields = allRequiredFieldsExists([fields.trustType, fields.trustLegalName, fields.businessAddress]);

    return isTrustAccount && hasProfileFields && hasTrustFields;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { mutateAsync: completeTrustDraftAccount, isSuccess, error, isLoading } = useCompleteTrustDraftAccount(getApiClient);
    const defaultValues: Fields = {
      corporationAnnualRevenue: storeFields.corporationAnnualRevenue,
      corporationNumberOfEmployees: storeFields.corporationNumberOfEmployees,
      corporationIndustry: storeFields.corporationIndustry,
    };

    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ corporationAnnualRevenue, corporationIndustry, corporationNumberOfEmployees }) => {
      await updateStoreFields({ corporationAnnualRevenue, corporationIndustry, corporationNumberOfEmployees });

      if (storeFields.accountId && corporationAnnualRevenue && corporationIndustry && corporationNumberOfEmployees) {
        await completeTrustDraftAccount({
          accountId: storeFields.accountId,
          input: {
            annualRevenue: { range: corporationAnnualRevenue },
            industry: { value: corporationIndustry },
            numberOfEmployees: { range: corporationNumberOfEmployees },
          },
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
          <BlackModalTitle title="Please provide  the following information regarding your corporation." />
          {error && <ErrorMessagesHandler error={error} />}
          <div className="flex w-full flex-col gap-16">
            <Select
              name="corporationAnnualRevenue"
              control={control}
              options={CORPORATION_ANNUAL_REVENUE_AS_OPTIONS}
              placeholder="Annual Revenue"
            />

            <Select
              name="corporationNumberOfEmployees"
              control={control}
              options={CORPORATION_NUMBER_OF_EMPLOYEES_AS_OPTIONS}
              placeholder="# of Employees"
            />

            <Select
              name="corporationIndustry"
              control={control}
              options={INDUESTRIES_AS_OPTIONS}
              placeholder="Industry"
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
