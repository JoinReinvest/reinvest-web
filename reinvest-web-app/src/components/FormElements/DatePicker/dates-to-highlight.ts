import { Dayjs } from 'dayjs';
import { useMemo } from 'react';

import { FREQUENCY_HANDLERS } from './frequency-handler';
import { HighlightFrequency } from './interfaces';

const HIGHLIGHTED_DATE_CLASSNAME = 'react-datepicker__day--highlighted';

export function useHighlightedDates(date: Dayjs | undefined, frequency: HighlightFrequency = 'weekly') {
  const datesToHighlight = useMemo(() => {
    let dates: Date[] = [];

    if (date) {
      const lastDayOfTheMonth = date.endOf('month');
      const isTodayLastDayOfTheMonth = date.isSame(lastDayOfTheMonth, 'day');

      if (isTodayLastDayOfTheMonth) {
        return [];
      }

      const handler = FREQUENCY_HANDLERS.get(frequency);
      const intervalDates = handler ? handler({ fromDate: date, lastDayOfTheMonth }) : [];

      dates = intervalDates;
    }

    return [{ [HIGHLIGHTED_DATE_CLASSNAME]: dates }];
  }, [date, frequency]);

  return { datesToHighlight };
}
