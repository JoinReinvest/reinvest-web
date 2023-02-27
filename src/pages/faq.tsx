import { NextPage } from 'next';

import { env } from '../env';
import { MainLayout } from '../layouts/MainLayout';

const Faq: NextPage = () => {
  return (
    <MainLayout>
      <iframe
        src={`${env.site.url}/faq?iframe=true`}
        className="h-screen w-full"
        title="FAQ page"
      />
    </MainLayout>
  );
};

export default Faq;
