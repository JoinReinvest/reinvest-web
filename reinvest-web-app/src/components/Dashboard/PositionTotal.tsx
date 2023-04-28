import cx from 'classnames';

import { InvestmentDetails } from './InvestmentDetails';
import { SectionTitle } from './SectionTitle';

interface Props {
  className?: string;
}

const totalPosition = [
  {
    title: 'Cost of Shares Owned',
    earnedMoney: 0,
  },
  {
    title: 'Quantity',
    earnedMoney: 0,
  },
  {
    title: 'Current NAV Per Share',
    earnedMoney: 0,
  },
];

const renderTotalPosition = () => {
  return totalPosition.map(item => {
    return (
      <InvestmentDetails
        key={item.title}
        title={item.title}
        earnedMoney={item.earnedMoney}
      />
    );
  });
};

export const PositionTotal = ({ className }: Props) => {
  const styles = cx('divide-y divide-gray-04 border border-gray-04 text-gray-01', className);

  return (
    <div className={styles}>
      <div className="px-24 py-16">
        <SectionTitle
          title="$0.00"
          subtitle="Position Total (Equity)"
          className="text-black"
        />
      </div>
      {renderTotalPosition()}
    </div>
  );
};
