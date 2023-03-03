import { ProtectedPage } from 'components/ProtectedPage';
import { Typography } from 'components/Typography';
import { NextPage } from 'next';
import { useGetUserProfile } from 'services/queries/getProfile';

import { Link } from '../components/Link';
import { URL } from '../constants/urls';
import { MainLayout } from '../layouts/MainLayout';

const Dashboard = () => {
  const { data } = useGetUserProfile();

  return (
    <MainLayout>
      <Typography variant="h3">First name: {data?.details?.firstName} </Typography>
      <Typography variant="h3">Middle name: {data?.details?.middleName} </Typography>
      <Typography variant="h3">Last name: {data?.details?.lastName}</Typography>
      <Link
        title="Logout"
        href={URL.logout}
      >
        LogOut
      </Link>
    </MainLayout>
  );
};

const Index: NextPage = () => {
  return (
    <ProtectedPage>
      <Dashboard />
    </ProtectedPage>
  );
};

export default Index;
