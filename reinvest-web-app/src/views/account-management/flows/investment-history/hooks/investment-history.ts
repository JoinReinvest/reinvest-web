// TO-DO: Refactor once GraphQL types are generated
// with the API state from the DEV environment - with
// `Query.listInvestments`.

import { DEFAULT_QUERY_META } from 'constants/queries';
import { useState } from 'react';
import { QueryMeta } from 'types/queries';
import { useTimeout } from 'usehooks-ts';

import { INVESTMENT_HISTORY } from '../constants';
import { InvestmentOverview } from '../interfaces';

interface Returns {
  investments: InvestmentOverview[];
  meta: QueryMeta;
}

export function useInvestmentHistory(): Returns {
  const [meta, setMeta] = useState<QueryMeta>({ ...DEFAULT_QUERY_META, isLoading: true });
  const [investments, setInvestments] = useState<InvestmentOverview[]>([]);

  function mockLoadInvestments() {
    setInvestments(INVESTMENT_HISTORY);
    setMeta({ ...DEFAULT_QUERY_META, isLoading: false });
  }

  useTimeout(mockLoadInvestments, 1500);

  return { investments, meta };
}
