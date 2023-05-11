import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { DatePicker } from 'components/FormElements/DatePicker';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RecurringInvestmentInterval } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Schema, z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Select your 1st investment date';

const SUBTITLES = new Map<RecurringInvestmentInterval, string>([
  [RecurringInvestmentInterval.WEEKLY, 'This will repeat on the same day each week.'],
  [RecurringInvestmentInterval.BI_WEEKLY, 'This will repeat on the same day bi-weekly.'],
  [RecurringInvestmentInterval.MONTHLY, 'This will repeat on the same day every month.'],
  [RecurringInvestmentInterval.QUARTERLY, 'This will repeat on the same day quaterly.'],
]);

function getSubtitle(interval: RecurringInvestmentInterval | undefined) {
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

  willBePartOfTheFlow: fields => !!fields._shouldDisplayRecurringInvestment,

  doesMeetConditionFields: fields => {
    const requiredFields = [
      fields._selectedAccount,
      fields.investmentAmount !== undefined,
      fields._willSetUpRecurringInvestment,
      fields.recurringInvestmentAmount !== undefined,
      fields.recurringInvestmentInterval,
    ];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = { date: storeFields?.recurringInvestmentDate };
    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const subtitle = getSubtitle(storeFields.recurringInvestmentInterval);

    const onSubmit: SubmitHandler<Fields> = async ({ date }) => {
      await updateStoreFields({ recurringInvestmentDate: date });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ModalTitle
            title={TITLE}
            subtitle={subtitle}
            isTitleCenteredOnMobile={false}
          />

          <DatePicker
            name="date"
            control={control}
            highlightInterval={storeFields.recurringInvestmentInterval}
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
