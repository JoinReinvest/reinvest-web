import { Dayjs } from 'dayjs';
import { useMemo } from 'react';

import { DateInterval } from '../interfaces';

export function useExcludedDates(date: Dayjs) {
  const excludedDateIntervals = useMemo<DateInterval[]>(() => {
    const dates: DateInterval[] = [];
    const firstDayOfTheMonth = date.startOf('month');
    const isTodayFirstDayOfTheMonth = date.isSame(firstDayOfTheMonth, 'day');

    if (!isTodayFirstDayOfTheMonth) {
      const dateBeforeToday = date.subtract(1, 'day');
      dates.push({ start: firstDayOfTheMonth.toDate(), end: dateBeforeToday.toDate() });
    }

    return dates;
  }, [date]);

  return { excludedDateIntervals };
}
