import { Link } from 'components/Link';
import { Typography } from 'components/Typography';

const index = () => {
  return (
    <div className="p-30 flex h-screen flex-col items-center justify-center gap-60">
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
    </div>
  );
};

export default index;
