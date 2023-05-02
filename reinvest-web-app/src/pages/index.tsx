import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { DashboardView } from 'views/dashboard';

const DashboardPage: NextPage = () => (
  <MainLayout>
    <DashboardView />
  </MainLayout>
);

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default DashboardPage;
