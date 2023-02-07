import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { Link } from 'components/Link';
import { Props } from '../interfaces';

export const ModalFullScreenFooter = ({ buttonProps }: Pick<Props, 'buttonProps'>) => (
  <footer className="md:max-w-332 md:mx-auto px-24 pb-36 md:pb-80 flex flex-col items-center gap-16">
    <Button
      {...buttonProps}
      className="self-center max-md:self-stretch"
    />

    <Typography
      variant="paragraph-small"
      className="text-center text-white"
    >
      By continuing, you agree to the REINVEST{' '}
      <Link
        title="Terms of Conditions"
        href="#"
      >
        Terms of Conditions
      </Link>{' '}
      and{' '}
      <Link
        title="Privacy Policy page"
        href="#"
      >
        Privacy Policy
      </Link>
      .
    </Typography>
  </footer>
);
