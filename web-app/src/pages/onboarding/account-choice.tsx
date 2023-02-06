import { RadioGroup } from '@hookooekoo/ui-radio-group';
import { AccountChoice, AccountChoiceProps } from 'components/AccountChoice';
import { Header } from 'components/Header';
import { Link } from 'components/Link';
import { NextPage } from 'next';

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

const renderAccountChoices = (item: AccountChoiceProps, index: number) => (
  <AccountChoice
    key={`account-choice-${index}`}
    {...item}
  />
);

const AccountChoicesPage: NextPage = () => {
  return (
    <div className="bg-black-01 flex h-screen w-screen flex-col items-center justify-center gap-60 p-24">
      <Header title="Which type of account would you like to open?" />
      <div className="flex w-full flex-col items-center gap-24">
        <RadioGroup className="flex w-full flex-col items-center justify-center gap-16 lg:flex-row lg:gap-24">
          {accountTypes.map(renderAccountChoices)}
        </RadioGroup>
        <Link
          href="/onboarding/descriptions"
          title="Not sure which is best for you?"
        />
      </div>
    </div>
  );
};

export default AccountChoicesPage;
