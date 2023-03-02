import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import { BlackModal } from 'components/BlackModal';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const accountTypes = [
  {
    title: 'For Individuals',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonText: 'Select Individuals',
    value: 'indyviduals',
  },
  {
    title: 'For Corporations',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,  adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonText: 'Select Corporations',
    value: 'corporations',
  },
  {
    title: 'For Trust',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,  adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonText: 'Select Trusts',
    value: 'trust',
  },
];

const AccountsDescriptionsPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<{ selected: string }>();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title
          title="Not sure which is best for you?"
          subtitle="Lear more about each option below"
        />

        <RadioGroup
          name="selected"
          control={form.control}
          className="mb-30 flex flex-col items-center gap-24"
        >
          {accountTypes.map(account => (
            <div
              key={account.value}
              className="border border-white"
            >
              <div className="flex flex-col gap-12 p-20">
                <Typography variant="paragraph-large">{account.title}</Typography>
                <Typography variant="paragraph-small">{account.description}</Typography>
              </div>
              <RadioGroupItem
                value={account.value}
                className="w-full bg-green-frost-01 py-20 text-paragraph-emphasized text-black-01"
              >
                {account.buttonText}
              </RadioGroupItem>
            </div>
          ))}
        </RadioGroup>
      </BlackModal>
    </MainLayout>
  );
};

export default AccountsDescriptionsPage;
