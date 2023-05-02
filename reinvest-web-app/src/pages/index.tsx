import { useFetch } from 'hooks/fetch';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { GetPostsResponse } from 'types/site-api';
import { DashboardView } from 'views/dashboard';

const DashboardPage: NextPage = () => {
  const { data, isLoading } = useFetch<GetPostsResponse>({
    url: '/api/posts',
  });

  const responseWasSuccessful = data && data.success;
  const hasPosts = responseWasSuccessful && !!data.data.length;
  const arePostsReady = !!hasPosts && !isLoading;
  const posts = data?.data || [];

  return (
    <MainLayout>
      <DashboardView
        arePostsReady={arePostsReady}
        posts={posts}
      />
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
