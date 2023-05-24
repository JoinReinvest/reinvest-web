import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { ModalTitle } from 'components/ModalElements/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RECURRING_INVESTMENT_INTERVAL_VALUES, RECURRING_INVESTMENT_INTERVALS } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Schema, z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'How often would you like to have a recurring investment?';

type Fields = Pick<FlowFields, 'recurringInvestmentInterval'>;

const schema: Schema<Fields> = z.object({
  recurringInvestmentInterval: z.enum(RECURRING_INVESTMENT_INTERVAL_VALUES),
});

export const StepRecurringInvestmentInterval: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_INVESTMENT_INTERVAL,

  willBePartOfTheFlow: fields => {
    return !!fields._willSetUpRecurringInvestment;
  },

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.oneTimeInvestment, fields._willSetUpRecurringInvestment, fields.recurringInvestment];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = { recurringInvestmentInterval: storeFields.recurringInvestmentInterval };
    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'onChange',
      defaultValues: async () => defaultValues,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ recurringInvestmentInterval }) => {
      await updateStoreFields({ recurringInvestmentInterval });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title={TITLE}
            isTitleCenteredOnMobile
          />

          <SelectionCards
            name="recurringInvestmentInterval"
            control={control}
            options={RECURRING_INVESTMENT_INTERVALS}
            orientation="vertical"
            className="flex flex-col justify-between gap-16"
            forWhiteBackground
            paddingSize="md"
          />
        </FormContent>

        <ButtonStack>
          <Button
            label="Skip"
            disabled
          />

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
