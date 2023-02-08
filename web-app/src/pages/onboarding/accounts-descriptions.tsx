import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import { Header } from 'components/Header';
import { Typography } from 'components/Typography';
import { NextPage } from 'next';

const accountTypesDescriptions = [
  {
    title: 'For Individuals',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'individual',
  },
  {
    title: 'For Corporations',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,  adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'corporation',
  },
  {
    title: 'For Trust',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,  adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'trust',
  },
];

const accountTypesSelectTitles = new Map<string, string>([
  ['individual', 'Select Individuals'],
  ['corporation', 'Select Corporations'],
  ['trust', 'Select Trusts'],
]);

const AccountsDescriptionsPage: NextPage = () => {
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-60 bg-black-01 p-24 lg:h-screen">
      <div className="fixed top-0 w-full bg-black-01 py-20 text-center text-white lg:relative">
        <Header
          title="Not sure which is best for you?"
          subtitle="Lear more about each option below"
        />
      </div>
      <RadioGroup className="mt-60 flex flex-col gap-15 text-white lg:mt-0 lg:flex-row">
        {accountTypesDescriptions.map(accountType => (
          <div
            key={accountType.value}
            className="flex w-full flex-col justify-between border border-white"
          >
            <div className="flex flex-col gap-12 p-20">
              <Typography variant="heading-6">{accountType.title}</Typography>
              <Typography variant="paragraph">{accountType.description}</Typography>
            </div>
            <RadioGroupItem
              value={accountType.value}
              className="w-full bg-green-frost-01 py-20 text-paragraph-emphasized text-black-01"
            >
              {accountTypesSelectTitles.get(accountType.value)}
            </RadioGroupItem>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default AccountsDescriptionsPage;
