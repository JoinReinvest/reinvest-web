import { NextPage } from 'next';

import { env } from '../../env';
import { FullWidthContentLayout } from '../../layouts/FullWidthContentLayout';

const Faq: NextPage = () => {
  return (
    <FullWidthContentLayout>
      <iframe
        src={`${env.site.url}/faq-iframe`}
        className="h-screen w-full"
        title="FAQ page"
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

export default Faq;
