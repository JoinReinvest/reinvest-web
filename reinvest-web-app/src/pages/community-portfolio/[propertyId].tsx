import { MainLayout } from 'layouts/MainLayout';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { PortfolioPropertyView } from 'views/portfolio-property';

interface Props {
  propertyId: string;
}

interface Params extends ParsedUrlQuery, Props {}

function CommunityPortfolioProperty() {
  return (
    <MainLayout>
      <PortfolioPropertyView />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async context => {
  const propertyId = context.params?.propertyId;

  if (!propertyId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      propertyId,
      protected: true,
    },
  };
};

export default CommunityPortfolioProperty;
