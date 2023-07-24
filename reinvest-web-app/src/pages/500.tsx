import { Link } from 'components/Link';
import { Typography } from 'components/Typography';

import { URL } from '../constants/urls';
import { MainLayout } from '../layouts/MainLayout';

export default function PageError() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center gap-60 p-30">
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
          href={URL.index}
        >
          Go to dashboard
        </Link>
      </div>
    </MainLayout>
  );
}
