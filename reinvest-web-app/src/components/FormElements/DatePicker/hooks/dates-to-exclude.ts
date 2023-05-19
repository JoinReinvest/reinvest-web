import { Dayjs } from 'dayjs';
import { useMemo } from 'react';

interface DateInterval {
  end: Date;
  start: Date;
}

interface Params {
  date: Dayjs;
}

interface Return {
  excludedDateIntervals: DateInterval[];
}

export function useExcludedDates({ date }: Params): Return {
  const excludedDateIntervals = useMemo(() => {
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
