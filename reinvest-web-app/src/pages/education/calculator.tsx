import { NextPage } from 'next';

import { env } from '../../env';
import { MainLayout } from '../../layouts/MainLayout';

const Calculator: NextPage = () => {
  return (
    <MainLayout>
      <iframe
        src={`${env.site.url}/calculators?iframe=true`}
        className="h-screen w-full"
        title="Calculator page"
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

export default Calculator;
