import { BlackModal } from 'components/BlackModal';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { GetHelpLink } from '../../components/Links/GetHelp';
import { ResendCodeLink } from '../../components/Links/ResendCodeLink';

const CheckPhonePage: NextPage = () => {
  const { control } = useForm<{ authenticationCode: string }>();

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

        <InputAuthenticationCode
          name="authenticationCode"
          control={control}
          required
        />

        <div className="my-20 flex justify-between">
          <GetHelpLink />
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default CheckPhonePage;
