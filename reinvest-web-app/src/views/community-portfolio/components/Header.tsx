import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { usePortfolio } from 'providers/Portfolio';

import { useModalManager } from '../providers/ModalManager';

const BUTTON_LABEL = 'Invest Now';

export const Header = () => {
  const { portfolio } = usePortfolio();
  const { onInvestmentModalOpenChange } = useModalManager();

  function onButtonClick() {
    onInvestmentModalOpenChange(true);
  }

  return (
    <header className="flex flex-wrap justify-between gap-32 md:gap-24">
      <Typography
        variant="h2-responsive"
        className="grow self-start"
      >
        {portfolio?.name}
      </Typography>

      <div className="min-w-full md:min-w-200">
        <Button
          label={BUTTON_LABEL}
          onClick={onButtonClick}
        />
      </div>
    </header>
  );
};
