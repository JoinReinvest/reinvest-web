import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';
import { BlackModal } from 'components/BlackModal';
import { Link } from 'components/Link';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useState } from 'react';

const EnterDateBirthPage: NextPage = () => {
  const [dateBirth, setDateBirth] = useState('');

  const birthMask: InputMaskedProps['maskOptions'] = {
    mask: '00/00/0000',
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
          <Title title="Enter your date of birth" />
          <div>
            <InputMasked
              maskOptions={birthMask}
              name="phone_number"
              value={dateBirth}
              onChange={updatedValue => setDateBirth(updatedValue)}
              placeholder="Date of Birth"
            />
            <Link
              href="/"
              title="why required link"
            >
              Required. Why?
            </Link>
          </div>
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default EnterDateBirthPage;
