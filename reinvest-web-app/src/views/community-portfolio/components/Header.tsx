import { Button } from 'components/Button';
import { Typography } from 'components/Typography';

import { useModalManager } from '../providers/ModalManager';

const TITLE = 'Community REIT';
const BUTTON_LABEL = 'Invest Now';

export const Header = () => {
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
        {TITLE}
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
