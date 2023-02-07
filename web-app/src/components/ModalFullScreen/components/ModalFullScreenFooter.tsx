import { Typography } from 'components/Typography';
import { Link } from 'components/Link';

export const ModalFullScreenFooter = () => (
  <footer className="md:max-w-332 md:mx-auto pt-16 px-24 pb-36 md:pb-80">
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
