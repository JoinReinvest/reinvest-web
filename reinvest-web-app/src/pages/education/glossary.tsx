import { env } from 'env';

import { FullWidthContentLayout } from '../../layouts/FullWidthContentLayout';

const Glossary = () => {
  return (
    <FullWidthContentLayout>
      <iframe
        src={`${env.site.url}/glossary?iframe=true`}
        className="h-screen w-full"
        title="Glossary page"
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

export default Glossary;
