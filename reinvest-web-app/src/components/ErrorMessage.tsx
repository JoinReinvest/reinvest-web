import { Typography } from './Typography';
import cx from 'classnames'

enum MessageVariant {
  error = 'error',
  info = 'info'
}

type MessageVariants = keyof typeof MessageVariant;

interface MessageProps {
  message: string;
  variant?: MessageVariants;
}

export const Message = ({ message, variant = MessageVariant.error }: MessageProps) => {
  const styles = cx({
    'mb-12': true,
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
