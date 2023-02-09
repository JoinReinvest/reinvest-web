import { Link } from 'components/Link';
import { SelectionCards } from 'components/SelectionCards';
import { Title } from 'components/Title';
import { NextPage } from 'next';

import { BlackModal } from '../../components/BlackModal';
import { MainLayout } from '../../layouts/MainLayout';

const accountTypes = [
  {
    title: 'For Individuals',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'individual',
  },
  {
    title: 'For Corporations',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'corporation',
  },
  {
    title: 'For Trust',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'trust',
  },
];

const AccountChoicesPage: NextPage = () => {
  return (
    <MainLayout>
      <BlackModal
        isOpen={true}
        onOpenChange={() => {
          console.log(1); // eslint-disable-line
        }}
      >
        <Title title="Which type of account would you like to open?" />
        <SelectionCards options={accountTypes} />
        <Link
          href="/onboarding/accounts-descriptions"
          title="Not sure which is best for you?"
        >
          Not sure which is best for you?
        </Link>
      </BlackModal>
    </MainLayout>
  );
};

export default AccountChoicesPage;
