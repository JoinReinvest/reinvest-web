// TO-DO: Deprecate this hook and use `useInvestmentSummary`
// from `src/hooks/investment-summary.ts` instead.

import { useMemo } from 'react';
import { InvestmentStatus, InvestmentSummary } from 'reinvest-app-common/src/types/graphql';

import { INVESTMENT_HISTORY } from '../constants';

interface Params {
  investmentId: string | null;
}

interface Returns {
  investment: InvestmentSummary | null;
}

export function useInvestmentSummary({ investmentId }: Params): Returns {
  const investment = useMemo<InvestmentSummary | null>(() => {
    const investmentOverview = INVESTMENT_HISTORY.find(({ id }) => id === investmentId) ?? null;

    if (investmentOverview === null) {
      return null;
    }

    return {
      ...investmentOverview,
      __typename: 'InvestmentSummary',
      status: InvestmentStatus.InProgress,
    };
  }, [investmentId]);

  return { investment };
}
