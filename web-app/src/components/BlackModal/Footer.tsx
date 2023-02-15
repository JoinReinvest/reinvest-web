import { Link } from 'components/Link';
import { Typography } from 'components/Typography';

export const Footer = () => (
  <footer className="w-330 mx-auto text-center">
    <Typography variant="paragraph">
      By continuing, you agree to the REINVEST
      <br />
      <Link
        title="Terms of Conditions"
        href="/terms-and-conditions"
      >
        Terms of Conditions
      </Link>{' '}
      and{' '}
      <Link
        title="Privacy Policy page"
        href="/privacy-policy"
      >
        Privacy Policy
      </Link>
      .
    </Typography>
  </footer>
);
