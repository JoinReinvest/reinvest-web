import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';
import { BlackModal } from 'components/BlackModal';
import { Link } from 'components/Link';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useState } from 'react';

const CheckPhonePage: NextPage = () => {
  const [codePhone, setCodePhone] = useState('');

  const codeMask: InputMaskedProps['maskOptions'] = {
    mask: '000-000',
  };

  return (
    <MainLayout>
      <BlackModal
        isOpen={true}
        onOpenChange={() => {
          console.log(1); // eslint-disable-line
        }}
      >
        <div className="flex flex-col gap-60">
          <div className="flex flex-col gap-8">
            <Title
              title="Check Your Phone"
              subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
            />
          </div>
          <div>
            <InputMasked
              maskOptions={codeMask}
              name="code_phone"
              value={codePhone}
              onChange={updatedValue => setCodePhone(updatedValue)}
              placeholder="Authentication Code"
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
          </div>
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default CheckPhonePage;
