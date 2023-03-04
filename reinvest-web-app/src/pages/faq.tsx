import { NextPage } from 'next';

import { ProtectedPage } from '../components/ProtectedPage';
import { env } from '../env';
import { MainLayout } from '../layouts/MainLayout';

const Faq: NextPage = () => {
  return (
    <ProtectedPage>
      <MainLayout>
        <iframe
          src={`${env.site.url}/faq?iframe=true`}
          className="h-screen w-full"
          title="FAQ page"
        />
      </MainLayout>
    </ProtectedPage>
  );
};

export default Faq;
