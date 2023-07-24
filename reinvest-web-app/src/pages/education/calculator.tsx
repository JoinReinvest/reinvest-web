import { NextPage } from 'next';
import { useEncrypt } from 'reinvest-app-common/src/services/queries/encrypt';

import { IconSpinner } from '../../assets/icons/IconSpinner';
import { env } from '../../env';
import { FullWidthContentLayout } from '../../layouts/FullWidthContentLayout';
import { getApiClient } from '../../services/getApiClient';

const Calculator: NextPage = () => {
  const { data: profileToken, isLoading } = useEncrypt(getApiClient, {});

  return (
    <FullWidthContentLayout>
      {!isLoading && (
        <iframe
          src={`${env.site.url}/calculator-iframe?token=${profileToken}`}
          className="h-screen w-full"
          title="Calculator page"
        />
      )}
      {isLoading && <IconSpinner />}
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
