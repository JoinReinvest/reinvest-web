import { env } from 'env';
import { MainLayout } from 'layouts/MainLayout';

const Glossary = () => {
  return (
    <MainLayout>
      <iframe
        src={`${env.site.url}/glossary?iframe=true`}
        className="h-screen w-full"
        title="Glossary page"
      />
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Glossary;
