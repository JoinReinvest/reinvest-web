import { usePosts } from 'hooks/posts';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { ActiveAccountChartProvider } from 'providers/ActiveAccountChart';
import { DashboardView } from 'views/dashboard';

const DashboardPage: NextPage = () => {
  const { posts, meta } = usePosts();

  const hasPosts = meta.isSuccess && !!posts.length;
  const arePostsReady = !!hasPosts && !meta.isLoading;

  return (
    <MainLayout>
      <ActiveAccountChartProvider>
        <DashboardView
          arePostsReady={arePostsReady}
          posts={posts}
        />
      </ActiveAccountChartProvider>
    </MainLayout>
  );
};

export function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default DashboardPage;
