import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { BlackModal } from 'components/BlackModal';
import { MainLayout } from 'layouts/MainLayout';
import { useEffect, useState } from 'react';

import { Title } from '../../../components/Title';

export const OnboardingIdentificationSuccessPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoading = false;
  const hasSucceded = true;
  const succededAndLoaded = !isLoading && hasSucceded;
  const notSuccededAndLoaded = !isLoading && hasSucceded;

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const titleGenerator = () => {
    if (succededAndLoaded) {
      return 'Account Information Verified!';
    }

    if (notSuccededAndLoaded) {
      return 'We cannot approve your account at this time';
    }

    return 'Verifying Account Information';
  };

  const iconGenerator = () => {
    if (succededAndLoaded) {
      return <IconCheckCircle />;
    }

    if (notSuccededAndLoaded) {
      return <IconXCircle />;
    }

    return <IconSpinner />;
  };

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <div className="flex flex-col items-center gap-36">
          <Title title={titleGenerator()} />

          {iconGenerator()}
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingIdentificationSuccessPage;
