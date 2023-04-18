import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Select } from 'components/Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CORPORATION_ANNUAL_REVENUE_AS_OPTIONS,
  CORPORATION_ANNUAL_REVENUES,
  CORPORATION_NUMBER_OF_EMPLOYEES,
  CORPORATION_NUMBER_OF_EMPLOYEES_AS_OPTIONS,
} from 'reinvest-app-common/src/constants/corporation';
import { INDUESTRIES_AS_OPTIONS, INDUSTRIES_VALUES } from 'reinvest-app-common/src/constants/industries';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

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
    const hasAccountType = !!accountType;
    const isCorporateOrTrust = hasAccountType && [DraftAccountType.Corporate, DraftAccountType.Trust].includes(accountType);

    return isCorporateOrTrust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { fiduciaryEntityInformation: storeFields.fiduciaryEntityInformation || {} };

    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const fiduciaryEntityTitle = storeFields.accountType === DraftAccountType.Corporate ? 'corporation' : 'trust';

    const onSubmit: SubmitHandler<Fields> = async ({ fiduciaryEntityInformation }) => {
      await updateStoreFields({ fiduciaryEntityInformation });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title={`Please provide the following information regarding your ${fiduciaryEntityTitle}.`} />

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
          />
        </ButtonStack>
      </Form>
    );
  },
};
