import { NextPage } from 'next';

import { env } from '../../env';
import { FullWidthContentLayout } from '../../layouts/FullWidthContentLayout';
import { useAuth } from '../../providers/AuthProvider';

const Calculator: NextPage = () => {
  const { user } = useAuth();

  return (
    <FullWidthContentLayout>
      <iframe
        src={`${env.site.url}/calculator-iframe?email=${user?.attributes?.email || ''}`}
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
