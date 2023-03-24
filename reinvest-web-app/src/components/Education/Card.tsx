import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { LinkProps } from 'next/link';
import { ReactNode } from 'react';

export interface EducationCardProps {
  buttonText: string;
  href: LinkProps['href'];
  icon: ReactNode;
  subtitle: string;
  title: string;
}

export const EducationCard = ({ title, subtitle, icon, buttonText, href }: EducationCardProps) => {
  return (
    <div className="flex w-full bg-green-frost-01/30 px-24 py-20 max-lg:relative lg:p-40">
      <div className="flex w-full flex-col items-start max-lg:pb-84 lg:justify-center">
        <Typography
          variant="h5"
          className="mb-8 mr-16"
        >
          {title}
        </Typography>
        <Typography
          variant="paragraph-large"
          className="mb-8 mr-16 text-gray-01"
        >
          {subtitle}
        </Typography>

        <Link
          href={href}
          title={title}
          className="typo-bonus-heading mr-16 flex aspect-square h-36 w-auto cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-green-frost-01 py-8 pl-16 font-stretch-normal"
        >
          <span className="block">{buttonText}</span>
          <IconArrowRight />
        </Link>
      </div>

      <div className="bottom-20 right-12 flex w-1/2 justify-end max-lg:absolute max-lg:child:w-auto">{icon}</div>
    </div>
  );
};
