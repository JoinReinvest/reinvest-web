import { NextPage } from 'next';

import { Link } from '../components/Link';
import { URL } from '../constants/urls';
import { MainLayout } from '../layouts/MainLayout';

const Index: NextPage = () => {
  return (
    <MainLayout>
      <Link
        title="Logout"
        href={URL.logout}
      >
        LogOut
      </Link>
    </MainLayout>
  );
};

export default Index;
