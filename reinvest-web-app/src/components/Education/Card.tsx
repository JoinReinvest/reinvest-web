import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Typography } from 'components/Typography';
import { ReactNode } from 'react';

export interface EducationCardProps {
  icon: ReactNode;
  subtitle: string;
  title: string;
  buttonText?: string;
}

export const EducationCard = ({ title, subtitle, icon, buttonText }: EducationCardProps) => {
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
        <div className="flex aspect-square h-36 w-36 cursor-pointer items-center justify-center rounded-full bg-green-frost-01 lg:w-auto lg:pl-16">
          {buttonText && (
            <Typography
              variant="paragraph"
              className="hidden whitespace-nowrap lg:block"
            >
              {buttonText}
            </Typography>
          )}
          <IconArrowRight />
        </div>
      </div>
      {icon && <div className="hidden w-1/2 lg:flex lg:justify-end">{icon}</div>}
    </div>
  );
};
