import { MainLayout } from 'layouts/MainLayout';
import { CommunityREITView } from 'views/community-reit';

function CommunityREITPage() {
  return (
    <MainLayout>
      <CommunityREITView />
    </MainLayout>
  );
}

export function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default CommunityREITPage;
