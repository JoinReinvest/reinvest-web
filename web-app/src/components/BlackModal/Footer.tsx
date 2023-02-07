import { Typography } from 'components/Typography';
import { Link } from 'components/Link';

export const Footer = () => (
  <footer className="text-center w-330 mx-auto">
    <Typography variant="paragraph">
      By continuing, you agree to the REINVEST<br />
      <Link title="Terms of Conditions" href="#">Terms of Conditions</Link>{' '}
      and{' '}
      <Link title="Privacy Policy page" href="#">Privacy Policy</Link>
      .
    </Typography>
  </footer>
);
