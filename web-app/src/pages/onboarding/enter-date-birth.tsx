import { BlackModal } from 'components/BlackModal';
import { Link } from 'components/Link';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';

import { BirthDateInput } from '../../components/BirthDateInput';

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
          date={'00/00/0000'}
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

export default EnterDateBirthPage;
