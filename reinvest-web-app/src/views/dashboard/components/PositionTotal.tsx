import cx from 'classnames';
import { useActiveAccount } from 'providers/ActiveAccountProvider';

import { PositionTotalTitles } from '../enums/titles';
import { InvestmentDetails } from './InvestmentDetails';
import { SectionTitle } from './SectionTitle';

interface Props {
  className?: string;
}

export const PositionTotal = ({ className }: Props) => {
  const { activeAccountStats, activeAccount } = useActiveAccount();
  const styles = cx('divide-y divide-gray-04 border border-gray-04 text-gray-01', className);

  return (
    <div className={styles}>
      <div className="px-24 py-16">
        <SectionTitle
          title={activeAccount?.positionTotal || ''}
          subtitle={PositionTotalTitles.POSITION_TOTAL}
          className="text-black"
        />
      </div>

      <InvestmentDetails
        title={PositionTotalTitles.COST_OF_SHARES_OWNED}
        earnedMoney={activeAccountStats?.costOfSharesOwned}
      />

      <InvestmentDetails
        title={PositionTotalTitles.QUANTITY}
        earnedMoney={activeAccountStats?.quantityOfShares}
      />

      <InvestmentDetails
        title={PositionTotalTitles.CURRENT_NAV_PER_SHARE}
        earnedMoney={activeAccountStats?.currentNAVPerShare}
      />
    </div>
  );
};
