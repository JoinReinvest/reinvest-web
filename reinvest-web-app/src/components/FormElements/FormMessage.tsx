import cx from 'classnames';

import { Typography } from '../Typography';

enum MessageVariant {
  error = 'error',
  info = 'info',
}

type MessageVariants = keyof typeof MessageVariant;

interface MessageProps {
  message: string;
  variant?: MessageVariants;
}

export const FormMessage = ({ message, variant = MessageVariant.error }: MessageProps) => {
  const styles = cx({
    'mb-12 first-letter:capitalize': true,
    'text-tertiary-error': variant === MessageVariant.error,
    'text-green-frost-01': variant === MessageVariant.info,
  });

  return (
    <Typography
      variant="paragraph-large"
      className={styles}
    >
      {message}
    </Typography>
  );
};
