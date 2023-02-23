import { Typography } from 'components/Typography';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import { MainLayout } from '../layouts/MainLayout';

const DashboardPage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <MainLayout>
      <Typography variant="h3">First name: {session?.user.firstName}</Typography>
      <Typography variant="h3">Middle name: {session?.user.middleName}</Typography>
      <Typography variant="h3">Last name: {session?.user.lastName}</Typography>
    </MainLayout>
  );
};

export default DashboardPage;
