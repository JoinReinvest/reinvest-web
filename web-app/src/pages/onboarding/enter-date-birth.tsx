import { BlackModal } from 'components/BlackModal';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';

import { BirthDateInput } from '../../components/FormElements/BirthDateInput';
import { WhyRequiredLink } from '../../components/Links/WhyRequiredLink';

const EnterDateBirthPage: NextPage = () => {
  return (
    <MainLayout>
      <BlackModal
        isOpen={true}
        onOpenChange={() => {
          console.log(1) // eslint-disable-line
        }}
      >
        <Title title="Enter your date of birth" />
        <BirthDateInput
          value={'00/00/0000'}
          onChange={() => {
          console.log(1) // eslint-disable-line
          }}
        />
        <WhyRequiredLink href="/" />
      </BlackModal>
    </MainLayout>
  );
};

export default EnterDateBirthPage;
