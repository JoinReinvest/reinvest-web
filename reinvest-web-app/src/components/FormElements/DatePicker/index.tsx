import dayjs from 'dayjs';
import ReactDatePicker from 'react-datepicker';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';

import { DayContent } from './DayContent';
import { Header } from './Header';
import { useExcludedDates } from './hooks/dates-to-exclude';
import { useHighlightedDates } from './hooks/dates-to-highlight';

interface Props<FormFields extends FieldValues> extends UseControllerProps<FormFields> {
  frequency?: RecurringInvestmentFrequency;
  startDate?: Date;
}

export function DatePicker<FormFields extends FieldValues>({ frequency, startDate = new Date(), ...controllerProps }: Props<FormFields>) {
  const { field } = useController(controllerProps);
  const { excludedDateIntervals } = useExcludedDates({ date: dayjs() });
  const { datesToHighlight, meta } = useHighlightedDates({ date: field.value, frequency });

  return (
    <ReactDatePicker
      name={field.name}
      ref={field.ref}
      minDate={startDate}
      onChange={field.onChange}
      onBlur={field.onBlur}
      renderCustomHeader={Header}
      renderDayContents={renderDayContents}
      excludeDateIntervals={excludedDateIntervals}
      highlightDates={datesToHighlight}
      inline
      allowSameDay
      selected={field.value}
      disabled={meta.isLoading}
    />
  );
}

function renderDayContents(dayOfMonth: number, date?: Date) {
  return (
    <DayContent
      dayOfMonth={dayOfMonth}
      date={date}
    />
  );
}
