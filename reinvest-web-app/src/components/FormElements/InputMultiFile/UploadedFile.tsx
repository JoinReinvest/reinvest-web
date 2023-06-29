import { IconTrashcan } from 'assets/icons/IconTrashcan';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { FieldValues } from 'react-hook-form';

import { Props as ParentProps } from './interfaces';

interface Props<FormFields extends FieldValues> extends Pick<ParentProps<FormFields>, 'variant'> {
  fileName: string;
  onRemove: () => void;
}

export function UploadedFile<FormFields extends FieldValues>({ fileName, onRemove, variant }: Props<FormFields>) {
  const isOutlined = variant === 'outlined';

  const className = cx('flex items-center justify-between gap-8 border p-8', {
    'border-dashed border-green-frost-01': isOutlined,
    'border-gray-04': !isOutlined,
  });

  const iconClassName = cx('cursor-pointer', {
    'stroke-white': isOutlined,
    'stroke-black-01': !isOutlined,
  });

  return (
    <div className={className}>
      <Typography
        variant="button"
        className="line-clamp-1 text-left"
      >
        {fileName}
      </Typography>

      <IconTrashcan
        className={iconClassName}
        onClick={onRemove}
      />
    </div>
  );
}
