import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { InvestmentOverview, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { InfiniteQueryMeta } from 'types/queries';

interface Returns {
  investmentsList: Maybe<InvestmentOverview>[];
  investmentsListMeta: InfiniteQueryMeta;
}

export function useInvestmentsList(): Returns {
  const { activeAccount } = useActiveAccount();
  const { data, ...investmentsListMeta } = useListInvestments(getApiClient, { accountId: activeAccount?.id || '', config: { enabled: !!activeAccount?.id } });
  const investmentsList = useMemo(() => data?.pages.map(page => page).flat() || [], [data]);

  return { investmentsList, investmentsListMeta };
}

// TO-DO: Deprecate once common repository is updated
import { useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { UseInfiniteApiQueryWithParams } from 'reinvest-app-common/src/services/queries/interfaces';
import { Query, QueryListInvestmentsArgs } from 'reinvest-app-common/src/types/graphql';

type Parameters = QueryListInvestmentsArgs & { config?: UseQueryOptions };
type Hook = UseInfiniteApiQueryWithParams<'listInvestments', Parameters>;

const DEFAULT_INVESTMENTS_PER_PAGE = 10;

const listInvestmentsQuery = gql`
  fragment InvestmentOverviewFragment on InvestmentOverview {
    id
    tradeId
    createdAt
    amount {
      value
      formatted
    }
  }

  query listInvestments($accountId: ID!, $pagination: Pagination) {
    listInvestments(accountId: $accountId, pagination: $pagination) {
      ...InvestmentOverviewFragment
    }
  }
`;

const useListInvestments: Hook = (getApiClient, { accountId, pagination, ...config }) =>
  useInfiniteQuery({
    ...config,

    queryKey: ['listInvestments', accountId, pagination],

    queryFn: async ({ pageParam = 0 }) => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { listInvestments } = await api.request<Query>(listInvestmentsQuery, {
        accountId,
        pagination: { page: pageParam, perPage: pagination?.perPage || DEFAULT_INVESTMENTS_PER_PAGE },
      });

      return listInvestments;
    },

    getNextPageParam: (lastPage, allPages) => {
      let isNextPage;

      if (lastPage) {
        // TO IMPROVE: We have to do an extra query to see if the API will
        // return an empty list to know if there is a next page.
        isNextPage = lastPage.length > 0;
      }

      return isNextPage ? allPages.length : undefined;
    },
  });
