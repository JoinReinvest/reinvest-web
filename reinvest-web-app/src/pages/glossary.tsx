import { env } from 'env';
import { MainLayout } from 'layouts/MainLayout';

import { ProtectedPage } from '../components/ProtectedPage';

const Glossary = () => {
  return (
    <ProtectedPage>
      <MainLayout>
        <iframe
          src={`${env.site.url}/glossary?iframe=true`}
          className="h-screen w-full"
          title="Glossary page"
        />
      </MainLayout>
    </ProtectedPage>
  );
};

export default Glossary;
