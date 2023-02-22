import { ErrorWrapper } from 'components/ErrorWrapper';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';

const index = () => {
  return (
    <ErrorWrapper>
      <div>
        <Typography
          variant="h1"
          className="text-center"
        >
          404
          <span className="mx-20">|</span>
          Page not found
        </Typography>
      </div>
      <Link
        title="Go to login page"
        href="/login"
      >
        Go to login page
      </Link>
    </ErrorWrapper>
  );
};

export default index;
