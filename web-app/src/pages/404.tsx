import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { ErrorLayout } from 'layouts/ErrorLayout';

const index = () => {
  return (
    <ErrorLayout>
      <Typography
        variant="h1"
        className="text-center"
      >
        404
        <span className="mx-20">|</span>
        Page not found
      </Typography>
      <Link
        title="Go to dashboard"
        href="/"
      >
        Go to dashboard
      </Link>
    </ErrorLayout>
  );
};

export default index;
