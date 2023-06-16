import { MainLayout } from 'layouts/MainLayout';
import { CommunityPortfolioView } from 'views/community-portfolio';

function CommunityPortfolio() {
  return (
    <MainLayout>
      <CommunityPortfolioView />
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

export default CommunityPortfolio;
