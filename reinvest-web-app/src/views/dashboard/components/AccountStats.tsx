import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';

import { EvsChart } from './EvsChart';
import { NetReturns } from './NetReturns';
import { PositionTotal } from './PositionTotal';

interface Props {
  toggleDisplayInitialInvestmentFlow: () => void;
}

export function AccountStats({ toggleDisplayInitialInvestmentFlow }: Props) {
  const { activeAccountStats } = useActiveAccount();

  return (
    <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
      <div className="lg:flex lg:w-full lg:max-w-330 lg:flex-col lg:justify-between lg:gap-8">
        <Typography
          variant="h3"
          className="hidden lg:block"
        >
          Dashboard
        </Typography>
        <Typography variant="h2">{activeAccountStats?.accountValue}</Typography>
        <Typography
          variant="paragraph-emphasized"
          className="mt-8 text-gray-02 lg:mt-0"
        >
          Account Value
        </Typography>

        <PositionTotal className="hidden lg:mt-8 lg:block" />

        <NetReturns className="hidden lg:mt-8 lg:block" />

        <Button
          label="Invest"
          onClick={() => toggleDisplayInitialInvestmentFlow()}
          className="hidden lg:mt-16 lg:block"
        />
      </div>

      <EvsChart />

      <Button
        label="Invest"
        className="lg:hidden"
        onClick={() => toggleDisplayInitialInvestmentFlow()}
      />

      <PositionTotal className="lg:hidden" />

      <NetReturns className="lg:hidden" />
    </div>
  );
}
