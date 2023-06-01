import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { DatePicker } from 'components/FormElements/DatePicker';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { RECURRING_INVESTMENT_SCHEDULE_SUBTITLES } from 'constants/recurring-investment';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Schema, z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Select your 1st investment date';

interface Fields {
  date?: Date;
}

const schema: Schema<Fields> = z.object({
  date: z.date(),
});

export const StepRecurringInvestmentDate: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_INVESTMENT_DATE,

  willBePartOfTheFlow: fields => {
    return !!fields._willSetUpRecurringInvestment;
  },

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._willSetUpRecurringInvestment, fields.recurringInvestment, fields.recurringInvestmentInterval];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { createRecurringInvestment, createRecurringInvestmentMeta } = useRecurringInvestment();

    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: async () => ({ date: storeFields?.recurringInvestment?.date }),
    });

    useEffect(() => {
      if (createRecurringInvestmentMeta.isSuccess) {
        moveToNextStep();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createRecurringInvestmentMeta.isSuccess]);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const subtitle = storeFields?.recurringInvestmentInterval && RECURRING_INVESTMENT_SCHEDULE_SUBTITLES.get(storeFields.recurringInvestmentInterval);

    const onSubmit: SubmitHandler<Fields> = async ({ date }) => {
      const { recurringInvestment, recurringInvestmentInterval } = storeFields;

      recurringInvestment && (await updateStoreFields({ recurringInvestment: { ...recurringInvestment, date } }));

      if (date && recurringInvestment?.amount && recurringInvestmentInterval) {
        await createRecurringInvestment({ date, investmentAmount: recurringInvestment.amount, frequency: recurringInvestmentInterval });
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop={!storeFields._forInitialInvestment}>
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
