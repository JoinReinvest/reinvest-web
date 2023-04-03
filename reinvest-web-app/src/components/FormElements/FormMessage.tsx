import cx from 'classnames';
import { ErrorResponse } from 'reinvest-app-common/src/services/queries/interfaces';

import { MessageMapper, messageMapper } from '../../constants/messageMapper';
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

export const getMessage = (error: ErrorResponse) => {
  const { response } = error;
  const { errors } = response;

  const messages = errors.map(error => {
    const extension = error.extensions;

    if (!extension.details) {
      return error.message;
    }

    return extension.details.map(detail => {
      return `${detail.field} ${messageMapper[detail.type as keyof MessageMapper]}`;
    });
  });

  return messages.flat();
};

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
