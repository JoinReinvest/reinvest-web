import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Typography } from 'components/Typography';
import { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import { Link } from '../Link';

export interface EducationCardProps {
  buttonText: string;
  href: LinkProps['href'];
  icon: ReactNode;
  subtitle: string;
  title: string;
}

export const EducationCard = ({ title, subtitle, icon, buttonText, href }: EducationCardProps) => {
  return (
    <div className="flex w-full bg-green-frost-01/30 px-24 py-20 lg:p-40">
      <div className="flex w-full items-center justify-between  lg:w-1/2 lg:flex-col lg:items-start lg:justify-center lg:gap-16">
        <div className="mr-16">
          <Typography
            variant="h5"
            className="mb-8"
          >
            {title}
          </Typography>
          <Typography
            variant="paragraph-large"
            className="text-gray-01"
          >
            {subtitle}
          </Typography>
        </div>
        <Link
          href={href}
          title={title}
          className="typo-bonus-heading flex aspect-square h-36 w-36 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-green-frost-01 font-stretch-normal lg:w-auto lg:pl-16"
        >
          <span className="hidden lg:inline">{buttonText}</span>
          <IconArrowRight />
        </Link>
      </div>
      <div className="hidden w-1/2 lg:flex lg:justify-end">{icon}</div>
    </div>
  );
};
