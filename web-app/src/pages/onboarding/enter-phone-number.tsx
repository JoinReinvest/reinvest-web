import { BlackModal } from 'components/BlackModal';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';

import { PhoneInput } from '../../components/FormElements/PhoneInput';
import { WhyRequiredLink } from '../../components/Links/WhyRequiredLink';

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
        <WhyRequiredLink href="/" />
      </BlackModal>
    </MainLayout>
  );
};

export default EnterPhoneNumberPage;
