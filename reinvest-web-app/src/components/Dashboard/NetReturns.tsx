import cx from 'classnames';

import { InvestmentDetails } from './InvestmentDetails';
import { SectionTitle } from './SectionTitle';

interface Props {
  className?: string;
}

const netReturns = [
  {
    title: 'Dividends',
    earnedMoney: 0,
  },
  {
    title: 'Appreciation',
    earnedMoney: 0,
  },
  {
    title: 'Advisory Fees',
    earnedMoney: 0,
  },
];

const renderNetReturns = () => {
  return netReturns.map(item => {
    return (
      <InvestmentDetails
        key={item.title}
        title={item.title}
        earnedMoney={item.earnedMoney}
      />
    );
  });
};
export const NetReturns = ({ className }: Props) => {
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
          title="$0.00"
          subtitle="Net Returns"
          className="text-black"
        />
      </div>
      {renderNetReturns()}
    </div>
  );
};
