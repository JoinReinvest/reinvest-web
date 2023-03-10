import { NextPage } from 'next';

import { env } from '../../env';
import { FullWidthContentLayout } from '../../layouts/FullWidthContentLayout';

const Calculator: NextPage = () => {
  return (
    <FullWidthContentLayout>
      <iframe
        src={`${env.site.url}/calculator?iframe=true`}
        className="h-screen w-full"
        title="Calculator page"
      />
    </FullWidthContentLayout>
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
