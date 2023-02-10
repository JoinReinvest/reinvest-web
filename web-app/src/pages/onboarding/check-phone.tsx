import { BlackModal } from 'components/BlackModal';
import { AuthenticationCodeInput } from 'components/FormElements/AuthenticationCodeInput';
import { Link } from 'components/Link';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const CheckPhonePage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title
          title="Check Your Phone"
          subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
        />
        <AuthenticationCodeInput
          value={'000-000'}
          onChange={() => {
            console.log(1); // eslint-disable-line
          }}
        />
        <div className="flex justify-between">
          <Link
            href="/"
            title="resend code link"
          >
            Resend Code
          </Link>
          <Link
            href="/"
            title="get help link"
          >
            Get Help
          </Link>
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default CheckPhonePage;
