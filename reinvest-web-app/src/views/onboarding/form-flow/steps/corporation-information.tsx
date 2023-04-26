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
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Required<Pick<OnboardingFormFields, 'fiduciaryEntityInformation'>>;

const schema = z.object({
  fiduciaryEntityInformation: z.object({
    annualRevenue: z.enum(CORPORATION_ANNUAL_REVENUES),
    numberOfEmployees: z.enum(CORPORATION_NUMBER_OF_EMPLOYEES),
    industry: z.enum(INDUSTRIES_VALUES),
  }),
});

export const StepCorporationInformation: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_INFORMATION,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Trust || accountType === DraftAccountType.Corporate;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const hasCorporateAndTrustFields = allRequiredFieldsExists([fields.businessAddress]);
    const hasTrustFields = allRequiredFieldsExists([fields.trustType, fields.trustLegalName]) && fields.accountType === DraftAccountType.Trust;
    const hasCorporateFields =
      allRequiredFieldsExists([fields.corporationType, fields.corporationLegalName, fields.ein]) && fields.accountType === DraftAccountType.Corporate;

    return hasProfileFields && hasCorporateAndTrustFields && (hasTrustFields || hasCorporateFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = {
      fiduciaryEntityInformation: storeFields.fiduciaryEntityInformation || {},
    };

    const {
      mutateAsync: completeTrustDraftAccount,
      isSuccess: isTrustDraftAccountSuccess,
      error: trustDraftAccountError,
      isLoading: isTrustDraftAccountLoading,
    } = useCompleteTrustDraftAccount(getApiClient);

    const {
      mutateAsync: completeCorporateDraftAccount,
      isSuccess: isCorporateDraftAccountSuccess,
      error: corporateDraftAccountError,
      isLoading: isCorporateDraftAccountLoading,
    } = useCompleteCorporateDraftAccount(getApiClient);

    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeLoading = isTrustDraftAccountLoading || isCorporateDraftAccountLoading;
    const shouldButtonBeDisabled = !formState.isValid || shouldButtonBeLoading;
    const fiduciaryEntityTitle = storeFields.accountType === DraftAccountType.Corporate ? 'corporation' : 'trust';

    const onSubmit: SubmitHandler<Fields> = async ({ fiduciaryEntityInformation }) => {
      await updateStoreFields({ fiduciaryEntityInformation });
      const { accountType, accountId } = storeFields;

      if (accountId && fiduciaryEntityInformation.annualRevenue && fiduciaryEntityInformation.numberOfEmployees && fiduciaryEntityInformation.industry) {
        const variables = {
          accountId,
          input: {
            annualRevenue: { range: fiduciaryEntityInformation.annualRevenue },
            industry: { value: fiduciaryEntityInformation.industry },
            numberOfEmployees: { range: fiduciaryEntityInformation.numberOfEmployees },
          },
        };

        if (accountType === DraftAccountType.Trust) {
          await completeTrustDraftAccount(variables);
        }

        if (accountType === DraftAccountType.Corporate) {
          await completeCorporateDraftAccount(variables);
        }
      }
    };

    useEffect(() => {
      if (isTrustDraftAccountSuccess || isCorporateDraftAccountSuccess) {
        moveToNextStep();
      }
    }, [isTrustDraftAccountSuccess, isCorporateDraftAccountSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title={`Please provide the following information regarding your ${fiduciaryEntityTitle}.`} />
          {trustDraftAccountError && <ErrorMessagesHandler error={trustDraftAccountError} />}
          {corporateDraftAccountError && <ErrorMessagesHandler error={corporateDraftAccountError} />}
          <div className="flex w-full flex-col gap-16">
            <Select
              name="fiduciaryEntityInformation.annualRevenue"
              control={control}
              options={CORPORATION_ANNUAL_REVENUE_AS_OPTIONS}
              placeholder="Annual Revenue"
            />

            <Select
              name="fiduciaryEntityInformation.numberOfEmployees"
              control={control}
              options={CORPORATION_NUMBER_OF_EMPLOYEES_AS_OPTIONS}
              placeholder="# of Employees"
            />

            <Select
              name="fiduciaryEntityInformation.industry"
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
            loading={shouldButtonBeLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
