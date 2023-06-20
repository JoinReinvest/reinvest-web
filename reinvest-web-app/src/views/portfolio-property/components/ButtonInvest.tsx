import cx from 'classnames';
import { Button } from 'components/Button';

import { useInvestmentFlow } from '../providers/InvestmentFlow';

interface Props {
  className?: string;
}

const BUTTON_LABEL = 'Invest Now';

export function ButtonInvest({ className }: Props) {
  const { onInvestmentModalOpenChange } = useInvestmentFlow();

  function onButtonClick() {
    onInvestmentModalOpenChange(true);
  }

  return (
    <div className={cx('md:max-w-200 w-full', className)}>
      <Button
        label={BUTTON_LABEL}
        onClick={onButtonClick}
        className=""
      />
    </div>
  );
}
