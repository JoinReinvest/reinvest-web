import { SelectionCards } from 'components/FormElements/SelectionCards';
import { Link } from 'components/Link';
import { Title } from 'components/Title';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<{ selection: string }>();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="Which type of account would you like to open?" />
        <SelectionCards
          name="selection"
          control={form.control}
          options={accountTypes}
          className="mb-30 flex flex-col items-stretch gap-24"
          orientation="vertical"
        />
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
