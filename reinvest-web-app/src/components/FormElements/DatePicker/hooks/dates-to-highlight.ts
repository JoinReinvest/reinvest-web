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
  const {
    data: dates,
    isLoading,
    isSuccess,
    refetch,
  } = useGetScheduleSimulation(getApiClient, {
    schedule: { startDate, frequency: frequency ?? RecurringInvestmentFrequency.Monthly },
    config: { enabled: !!frequency && !!date },
  });
  const datesToHighlight = useMemo(
    () => [
      {
        [HIGHLIGHTED_DATE_CLASSNAME]: dates?.map(date => new Date(date)) ?? [],
      },
    ],
    [dates],
  );

  const meta: QueryMeta = { isLoading, isSuccess, refetch };

  return { datesToHighlight, meta };
}
