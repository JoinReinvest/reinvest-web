import { BlackModal } from 'components/BlackModal';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { IconXCircle } from '../../../assets/icons/IconXCircle';
import { Title } from '../../../components/Title';

const OnboardingSocialSecurityNumberFailurePage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="We cannot verify your Social Secuirty at this time" />

        <div className="text-center">
          <Typography variant="paragraph-large">
            Please reach out to{' '}
            <Link
              href="mailto:support@reinvestcommunity.com"
              title="Support email"
            >
              support@reinvestcommunity.com
            </Link>
          </Typography>

          <IconXCircle className="mx-auto mt-40" />
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingSocialSecurityNumberFailurePage;
