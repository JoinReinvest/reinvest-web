import { MainLayout } from '../../layouts/MainLayout';

const Index = () => {
  return <MainLayout>education page</MainLayout>;
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Index;
