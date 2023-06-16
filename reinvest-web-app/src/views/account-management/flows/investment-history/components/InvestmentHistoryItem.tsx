import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';
// import { useItemIntersectionObserver } from 'hooks/intersection-observer';
import { useRef } from 'react';
import { InvestmentOverview, Maybe } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

// import { useInvestmentHistory } from '../providers/InvestmentHistory';
import { formatTradeId } from '../utilities';

interface Props {
  fetchMoreItems: () => void;
  investment: Maybe<InvestmentOverview>;
  isLastItem: boolean;
  onClick: (investment: Maybe<InvestmentOverview>) => Promise<void>;
}

export function InvestmentHistoryItem({ investment, isLastItem, onClick }: Props) {
  const ref = useRef<HTMLLIElement>(null);

  // TO-DO: Once `Query.listInvestments` returns non-mocked investments we can uncomment the code
  // below to fetch more items when the last item is visible.

  // const { investmentsListMeta } = useInvestmentHistory();
  // useItemIntersectionObserver({ ref, isLastItem, callback: fetchMoreItems, willTriggerCallback: !!investmentsListMeta.hasNextPage });

  const tradeLabel = formatTradeId(investment?.tradeId || '');
  const date = formatDate(investment?.createdAt, 'INVESTMENT_SUMMARY', { currentFormat: 'API' });

  return (
    <>
      <li
        ref={ref}
        className="w-full"
      >
        <button
          className="flex w-full items-center justify-between"
          onClick={() => onClick(investment)}
        >
          <div className="flex flex-col text-left">
            <Typography variant="bonus-heading-regular">{tradeLabel}</Typography>
            <Typography variant="paragraph">{date}</Typography>
          </div>

          <div className="flex items-center">
            <Typography variant="h6">{investment?.amount?.formatted}</Typography>

            <IconArrowRight />
          </div>
        </button>
      </li>

      {!isLastItem && <Separator />}
    </>
  );
}
