import { env } from 'env';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';

const Glossary: NextPage = () => {
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

export default Glossary;
