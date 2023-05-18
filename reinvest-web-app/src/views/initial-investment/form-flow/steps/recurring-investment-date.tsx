import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { DatePicker } from 'components/FormElements/DatePicker';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';
import { Schema, z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Select your 1st investment date';

const SUBTITLES = new Map<RecurringInvestmentFrequency, string>([
  [RecurringInvestmentFrequency.Weekly, 'This will repeat on the same day each week.'],
  [RecurringInvestmentFrequency.BiWeekly, 'This will repeat on the same day bi-weekly.'],
  [RecurringInvestmentFrequency.Monthly, 'This will repeat on the same day every month.'],
  [RecurringInvestmentFrequency.Quarterly, 'This will repeat on the same day quaterly.'],
]);

function getSubtitle(interval: RecurringInvestmentFrequency | undefined) {
  if (interval) {
    return SUBTITLES.get(interval);
  }

  return undefined;
}

interface Fields {
  date?: Date;
}

const schema: Schema<Fields> = z.object({
  date: z.date(),
});

export const StepRecurringInvestmentDate: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_INVESTMENT_DATE,

  willBePartOfTheFlow: fields => {
    return !!fields._willSetUpRecurringInvestments;
  },

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.oneTimeInvestment, fields._willSetUpRecurringInvestments, fields.recurringInvestment, fields.recurringInvestmentInterval];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = { date: storeFields?.recurringInvestment?.date };
    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const subtitle = getSubtitle(storeFields.recurringInvestmentInterval);

    const onSubmit: SubmitHandler<Fields> = async ({ date }) => {
      const recurringInvestment = storeFields.recurringInvestment ?? { type: 'recurrent' };
      const updatedRecurringInvestment = { ...recurringInvestment, date };

      await updateStoreFields({ recurringInvestment: updatedRecurringInvestment });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title={TITLE}
            subtitle={subtitle}
            isTitleCenteredOnMobile
          />

          <DatePicker
            name="date"
            control={control}
            frequency={storeFields.recurringInvestmentInterval}
          />
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
