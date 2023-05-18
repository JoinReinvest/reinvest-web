import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
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
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { useActiveAccount } from '../../../../providers/ActiveAccountProvider';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Required<Pick<FlowFields, 'fiduciaryEntityInformation'>>;

const schema = z.object({
  fiduciaryEntityInformation: z.object({
    annualRevenue: z.enum(CORPORATION_ANNUAL_REVENUES),
    numberOfEmployees: z.enum(CORPORATION_NUMBER_OF_EMPLOYEES),
    industry: z.enum(INDUSTRIES_VALUES),
  }),
});

export const StepCorporationInformation: StepParams<FlowFields> = {
  identifier: Identifiers.CORPORATION_INFORMATION,

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const defaultValues: Fields = {
      fiduciaryEntityInformation: storeFields.fiduciaryEntityInformation || {},
    };

    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid;
    const fiduciaryEntityTitle = activeAccount?.type === AccountType.Corporate ? 'corporation' : 'trust';

    const onSubmit: SubmitHandler<Fields> = async () => {
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle title={`Please provide the following information regarding your ${fiduciaryEntityTitle}.`} />
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
