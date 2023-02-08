import { BlackModal } from 'components/BlackModal';
import { Link } from 'components/Link';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';

import { PhoneInput } from '../../components/PhoneInput';

const EnterPhoneNumberPage: NextPage = () => {
  return (
    <MainLayout>
      <BlackModal
        isOpen={true}
        onOpenChange={() => {
          console.log(1) // eslint-disable-line
        }}
      >
        <Title
          title="Enter your phone number"
          subtitle="We’ll text you a confirmation code within 10 minutes."
        />
        <PhoneInput
          value={''}
          onChange={() => {
          console.log(1) // eslint-disable-line
          }}
        />
        <div className="mt-20 block">
          <Link
            href="/"
            title="why required link"
          >
            Required. Why?
          </Link>
        </div>
      </BlackModal>
    </MainLayout>
  );
};

export default EnterPhoneNumberPage;
