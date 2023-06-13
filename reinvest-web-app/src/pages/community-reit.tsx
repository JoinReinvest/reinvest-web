import { MainLayout } from 'layouts/MainLayout';

function CommunityREITPage() {
  return <MainLayout></MainLayout>;
}

export function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default CommunityREITPage;
