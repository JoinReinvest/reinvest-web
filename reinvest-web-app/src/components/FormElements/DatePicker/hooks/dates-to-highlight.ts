import { useMemo } from 'react';
import { ReactDatePickerProps } from 'react-datepicker';
import { useGetScheduleSimulation } from 'reinvest-app-common/src/services/queries/getScheduleSimulation';
import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

import { HIGHLIGHTED_DATE_CLASSNAME } from '../constants';

interface Params {
  date: Date | undefined;
  frequency?: RecurringInvestmentFrequency;
}

interface Return {
  datesToHighlight: ReactDatePickerProps['highlightDates'];
  meta: QueryMeta;
}

export function useHighlightedDates({ date, frequency }: Params): Return {
  const startDate = date && formatDate(date, 'API');
  const { data: dates, ...meta } = useGetScheduleSimulation(getApiClient, {
    schedule: { startDate, frequency: frequency ?? RecurringInvestmentFrequency.Weekly },
    config: { enabled: !!frequency && !!date },
  });

  const datesToHighlight = useMemo(() => {
    if (!dates) return [];

    const datesWithoutSelectedDate = dates.filter(date => date !== startDate).map(date => new Date(date));

    return [
      {
        [HIGHLIGHTED_DATE_CLASSNAME]: datesWithoutSelectedDate,
      },
    ];
  }, [dates, startDate]);

  return { datesToHighlight, meta };
}
