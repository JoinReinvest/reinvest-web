import { ReferralCodeInput } from 'components/FormElements/ReferralCodeInput';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { BlackModal } from '../../components/BlackModal';
import { Title } from '../../components/Title';
import { MainLayout } from '../../layouts/MainLayout';

const ReferralCodePage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title
          title="Your referral code has been applied."
          subtitle="You and your referrer will receive $20 in dividends following your first investment!"
        />

        <ReferralCodeInput
          onChange={console.log} // eslint-disable-line
          value={'email@example.com'}
        />
      </BlackModal>
    </MainLayout>
  );
};

export default ReferralCodePage;
