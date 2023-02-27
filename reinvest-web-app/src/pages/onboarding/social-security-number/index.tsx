import { BlackModal } from 'components/BlackModal';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { SSNInput } from '../../../components/FormElements/SSNInput';
import { WhyRequiredLink } from '../../../components/Links/WhyRequiredLink';
import { Title } from '../../../components/Title';

const OnboardingSocialSecurityNumberPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="What's your social security number?" />

        <Typography variant="paragraph-emphasized">*REINVEST is required by law to collect your social security number.</Typography>
        <Typography
          variant="paragraph"
          className="mt-10 mb-20 text-white/50"
        >
          We take the security of your data very seriously, vestibulum non lacus et eros elementum pellentesque. Duis urna et nunc porta facilisis.
        </Typography>

        <SSNInput />

        <WhyRequiredLink href="/" />
      </BlackModal>
    </MainLayout>
  );
};

export default OnboardingSocialSecurityNumberPage;
