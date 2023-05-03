import dayjs from 'dayjs';
import ReactDatePicker from 'react-datepicker';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { RecurringInvestmentInterval } from 'temporal/constants/recurring-investment-intervals';

import { useExcludedDates } from './dates-to-exclude';
import { useHighlightedDates } from './dates-to-highlight';
import { DayContent } from './DayContent';
import { Header } from './Header';

interface Props<FormFields extends FieldValues> extends UseControllerProps<FormFields> {
  highlightInterval?: RecurringInvestmentInterval;
}

export function DatePicker<FormFields extends FieldValues>({ highlightInterval, ...controllerProps }: Props<FormFields>) {
  const { field } = useController(controllerProps);
  const { excludedDateIntervals } = useExcludedDates(dayjs());
  const { datesToHighlight } = useHighlightedDates(dayjs(field.value), highlightInterval);

  return (
    <ReactDatePicker
      name={field.name}
      ref={field.ref}
      startDate={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      renderCustomHeader={Header}
      renderDayContents={renderDayContents}
      excludeDateIntervals={excludedDateIntervals}
      highlightDates={datesToHighlight}
      inline
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
