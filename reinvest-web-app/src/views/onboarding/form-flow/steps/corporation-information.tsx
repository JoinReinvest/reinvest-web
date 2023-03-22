import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { Select } from 'components/Select';
import {
  CORPORATION_ANNUAL_REVENUE_AS_OPTIONS,
  CORPORATION_ANNUAL_REVENUES,
  CORPORATION_NUMBER_OF_EMPLOYEES,
  CORPORATION_NUMBER_OF_EMPLOYEES_AS_OPTIONS,
} from 'constants/corporation';
import { INDUESTRIES_AS_OPTIONS, INDUSTRIES_VALUES } from 'constants/industries';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

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
    return accountType === 'CORPORATE';
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
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

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ corporationAnnualRevenue, corporationIndustry, corporationNumberOfEmployees }) => {
      await updateStoreFields({ corporationAnnualRevenue, corporationIndustry, corporationNumberOfEmployees });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <BlackModalTitle title="Please provide  the following information regarding your corporation." />

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
