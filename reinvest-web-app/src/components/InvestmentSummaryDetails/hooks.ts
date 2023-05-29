import { useMemo } from 'react';
import { InvestmentSummary, Maybe } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { DETAIL_LABELS } from './constants';
import { Details } from './interfaces';

interface Params {
  investment: Maybe<InvestmentSummary>;
}

interface Returns {
  details: Details;
  status: string;
}

export function useDetails({ investment }: Params): Returns {
  const status = useMemo(() => investment?.status?.split('_').join(' ') ?? '', [investment]);

  const details = useMemo<Details>(() => {
    const dateFromInvestment = new Date(investment?.createdAt);
    const date = formatDate(dateFromInvestment, 'INVESTMENT_SUMMARY');

    const amount = investment?.amount?.formatted ?? '';
    // Mocked because API doesn't return the bank account yet.
    const bankAccount = '123456123456';

    return [
      { label: DETAIL_LABELS.DATE, value: date },
      { label: DETAIL_LABELS.AMOUNT, value: amount },
      { label: DETAIL_LABELS.STATUS, value: status },
      { label: DETAIL_LABELS.BANK_ACCOUNT, value: bankAccount },
    ];
  }, [investment, status]);

  return { details, status };
}
