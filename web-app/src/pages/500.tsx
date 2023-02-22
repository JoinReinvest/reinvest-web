import { Typography } from 'components/Typography';
import { ErrorLayout } from 'layouts/ErrorLayout';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <ErrorLayout>
      <Typography
        variant="h1"
        className="text-center"
      >
        500
        <span className="mx-20">|</span>
        Internal Server Error
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
