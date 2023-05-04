import cx from 'classnames';
import { Typography } from 'components/Typography';
import { ReactNode } from 'react';

import { WarningMessage } from './WarningMessage';

interface Props {
  title: string;
  className?: string;
  informationMessage?: string;
  isTitleCenteredOnMobile?: boolean;
  subtitle?: ReactNode;
}

export const ModalTitle = ({ title, subtitle, informationMessage, className = '', isTitleCenteredOnMobile = false }: Props) => {
  const hasSubtitle = !!subtitle;
  const isSubtitleAString = typeof subtitle === 'string';
  const hasInformationMessage = !!informationMessage;
  const hasSubtitleOrInformationMessage = hasSubtitle || hasInformationMessage;

  const containerClassName = cx(
    {
      'w-full flex flex-col gap-8 lg:gap-36 items-start': hasSubtitleOrInformationMessage,
      'lg:pb-36': !hasSubtitleOrInformationMessage,
    },
    className,
  );

  const titleClassname = cx({
    'text-center': isTitleCenteredOnMobile,
    'text-left lg:text-center': !isTitleCenteredOnMobile,
  });

  return (
    <div className={containerClassName}>
      <Typography
        variant="h5"
        className={titleClassname}
      >
        {title}
      </Typography>

      {hasSubtitle && isSubtitleAString ? <Typography variant="paragraph-large">{subtitle}</Typography> : subtitle}

      {hasInformationMessage && <WarningMessage message={informationMessage} />}
    </div>
  );
};
