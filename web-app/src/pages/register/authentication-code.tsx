import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { BlackModal } from '../../components/BlackModal';
import { AuthenticationCodeInput } from '../../components/FormElements/AuthenticationCodeInput';
import { Link } from '../../components/Link';
import { Title } from '../../components/Title';
import { MainLayout } from '../../layouts/MainLayout';

const AuthenticationCodePage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title
          title="Check Your Email"
          subtitle={`Enter the email authentication code sent to your email test@example.com.`}
        />

        <AuthenticationCodeInput
          onChange={console.log} // eslint-disable-line
          value={'email@example.com'}
        />

        <div className="flex justify-between">
          <Link
            href="/"
            title="Re-send authentication code"
          >
            Resend Code
          </Link>
          <Link
            href="/"
            title="Get help"
          >
            Get Help
          </Link>
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default AuthenticationCodePage;
