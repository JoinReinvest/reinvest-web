import { Dayjs } from 'dayjs';
import { countWeeksInMonth, getWeekOfMonth } from 'reinvest-app-common/src/utilities/dates';

import { HighlightFrequency } from './interfaces';

interface Params {
  fromDate: Dayjs;
  lastDayOfTheMonth: Dayjs;
}

type Handler = (params: Params) => Date[];

export const FREQUENCY_HANDLERS = new Map<HighlightFrequency, Handler>([
  [
    'weekly',
    ({ fromDate, lastDayOfTheMonth }) => {
      const dates: Date[] = [];

      const dateDayIndex = fromDate.get('day');
      const dateWeekIndex = getWeekOfMonth(fromDate);
      const numberOfWeeksInMonth = countWeeksInMonth(fromDate);

      let currentDate = fromDate;

      for (let weekIndex = dateWeekIndex + 1; weekIndex <= numberOfWeeksInMonth; weekIndex++) {
        const isSameDay = currentDate.get('day') === dateDayIndex;
        const isWithinMonth = currentDate.isBefore(lastDayOfTheMonth);

        if (isSameDay && isWithinMonth) {
          dates.push(currentDate.toDate());
        }

        currentDate = currentDate.add(1, 'week');
      }

      return dates;
    },
  ],

  [
    'bi-weekly',
    ({ fromDate, lastDayOfTheMonth }) => {
      const dateInTwoWeeks = fromDate.add(2, 'week');
      const isWithinMonth = dateInTwoWeeks.isBefore(lastDayOfTheMonth);

      if (isWithinMonth) {
        return [dateInTwoWeeks.toDate()];
      }

      return [];
    },
  ],

  ['monthly', () => []],
  ['quarterly', () => []],
]);
