import { ProtectedPage } from 'components/ProtectedPage';
import { Typography } from 'components/Typography';
import { NextPage } from 'next';

import { Link } from '../components/Link';
import { URL } from '../constants/urls';
import { MainLayout } from '../layouts/MainLayout';

const Index: NextPage = () => {
  return (
    <ProtectedPage>
      <MainLayout>
        <Typography variant="h3">First name: </Typography>
        <Typography variant="h3">Middle name: </Typography>
        <Typography variant="h3">Last name: </Typography>
        <Link
          title="Logout"
          href={URL.logout}
        >
          LogOut
        </Link>
      </MainLayout>
    </ProtectedPage>
  );
};

export default Index;
