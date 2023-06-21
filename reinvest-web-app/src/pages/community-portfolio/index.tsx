import { MainLayout } from 'layouts/MainLayout';
import { PortfolioProvider } from 'providers/Portfolio';
import { CommunityPortfolioView } from 'views/community-portfolio';

function CommunityPortfolio() {
  return (
    <MainLayout>
      <PortfolioProvider>
        <CommunityPortfolioView />
      </PortfolioProvider>
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
