import { IconWarning } from 'assets/icons/IconWarning';
import cx from 'classnames';
import { Typography } from 'components/Typography';

interface Props {
  message: string;
  modalColor?: 'black' | 'white';
  withoutMarginBottom?: boolean;
}

export const WarningMessage = ({ message, modalColor = 'black', withoutMarginBottom = false }: Props) => {
  const className = cx('flex items-center gap-8', {
    'text-green-frost-01': modalColor === 'black',
    'text-black-01': modalColor === 'white',
    'mb-20': !withoutMarginBottom,
  });

  return (
    <div className={className}>
      <IconWarning />
      <Typography variant="paragraph">{message}</Typography>
    </div>
  );
};
