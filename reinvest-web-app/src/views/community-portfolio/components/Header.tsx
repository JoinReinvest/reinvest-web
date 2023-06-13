import { Typography } from 'components/Typography';

import { ButtonInvest } from './ButtonInvest';

const TITLE = 'Community REIT';

export const Header = () => (
  <header className="flex justify-between gap-32 md:gap-24">
    <Typography
      variant="h2-responsive"
      className="grow self-start"
    >
      {TITLE}
    </Typography>

    <ButtonInvest />
  </header>
);
