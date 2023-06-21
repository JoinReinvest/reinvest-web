import { IconChain } from 'assets/icons/IconChain';
import { IconEyeHide } from 'assets/icons/IconEyeHide';
import { Typography } from 'components/Typography';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

const LIST_ITEMS = [
  {
    icon: <IconChain />,
    title: 'Connect effortlessly',
    description: 'Plaid lets you securely connect your financial accounts in seconds.',
  },
  {
    icon: <IconEyeHide className="h-24 w-24 stroke-black-01" />,
    title: 'Your data belongs to you',
    description: "Plaid doesn't sell personal info, ad will only use it with your permission.",
  },
];

export const PlaidDisclaimer = () => (
  <ul className="flex flex-col gap-24">
    {LIST_ITEMS.map(({ icon, title, description }) => (
      <li
        className="flex gap-8"
        key={lowerCaseWithoutSpacesGenerator(title)}
      >
        {icon}

        <div className="flex flex-col gap-8">
          <Typography variant="paragraph-emphasized">{title}</Typography>
          <Typography variant="paragraph-large">{description}</Typography>
        </div>
      </li>
    ))}
  </ul>
);
