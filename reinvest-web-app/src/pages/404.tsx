import { Link } from 'components/Link';
import { Typography } from 'components/Typography';

import { MainLayout } from '../layouts/MainLayout';

const ErrorPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center gap-60 p-30">
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
      </div>
    </MainLayout>
  );
};

export default ErrorPage;
