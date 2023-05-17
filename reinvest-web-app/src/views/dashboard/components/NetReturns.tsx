import cx from 'classnames';
import { useActiveAccount } from 'providers/ActiveAccountProvider';

import { NetReturnTitles } from '../enums/titles';
import { InvestmentDetails } from './InvestmentDetails';
import { SectionTitle } from './SectionTitle';

interface Props {
  className?: string;
}

export const NetReturns = ({ className }: Props) => {
  const { activeAccountStats } = useActiveAccount();

  const styles = cx(
    {
      'divide-y divide-gray-04 border border-gray-04 text-gray-01': true,
    },
    className,
  );

  return (
    <div className={styles}>
      <div className="px-24 py-16">
        <SectionTitle
          title={activeAccountStats?.netReturns || ''}
          subtitle={NetReturnTitles.NET_RETURNS}
          className="text-black"
        />
      </div>

      <InvestmentDetails
        title={NetReturnTitles.DIVIDENDS}
        earnedMoney={activeAccountStats?.dividends}
      />

      <InvestmentDetails
        title={NetReturnTitles.APPRECIATION}
        earnedMoney={activeAccountStats?.appreciation}
      />

      <InvestmentDetails
        title={NetReturnTitles.ADVISORY_FEES}
        earnedMoney={activeAccountStats?.advisorFees}
      />
    </div>
  );
};
