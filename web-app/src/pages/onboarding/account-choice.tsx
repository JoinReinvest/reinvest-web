import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import { Typography } from 'components/Typography';
import { NextPage } from 'next';
import Link from 'next/link';

const accountTypes = [
  {
    title: 'For Individuals',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    key: 'individual',
  },
  {
    title: 'For Corporations',

    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    key: 'corporation',
  },
  {
    title: 'For Trust',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    key: 'trust',
  },
];

const AccountChoice: NextPage = () => {
  return (
    <div className="bg-black-01 flex h-screen w-screen flex-col items-center justify-center gap-60 p-24">
      <Typography
        variant="heading-5"
        className="text-white lg:w-1/4 lg:text-center"
      >
        Which type of account would you like to open?
      </Typography>
      <div className="flex w-full flex-col items-center gap-24">
        <RadioGroup className="flex w-full flex-col items-center justify-center gap-16 lg:flex-row lg:gap-24">
          {accountTypes.map(accountType => (
            <RadioGroupItem
              key={accountType.key}
              value={accountType.key}
              className="border-gray-03 flex w-full flex-col items-center justify-center gap-4 border py-24"
            >
              <Typography
                variant="paragraph-emphasized"
                className="text-white "
              >
                {accountType.title}
              </Typography>
              <Typography
                className="text-gray-03 w-1/2"
                variant="paragraph-small"
              >
                {accountType.description}
              </Typography>
            </RadioGroupItem>
          ))}
        </RadioGroup>
        <Link
          href="/onboarding/descriptions"
          className="text-green-frost-01 underline"
        >
          <Typography variant="link">Not sure which is best for you?</Typography>
        </Link>
      </div>
    </div>
  );
};

export default AccountChoice;
