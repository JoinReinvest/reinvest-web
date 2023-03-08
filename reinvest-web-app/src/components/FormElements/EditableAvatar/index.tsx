import { AvatarProps, AvatarWithButton as PrimitiveAvatarWithButton } from '@hookooekoo/ui-avatar';
import placeholderImage from 'assets/images/profile-picture-placeholder.png';
import cx from 'classnames';
import { FormMessage } from 'components/FormElements/FormMessage';
import Image from 'next/image';
import { ChangeEventHandler, useMemo, useState } from 'react';

import { EditAvatarButton } from './EditAvatarButton';
import { getValidationsSchema } from './schema';

interface Props extends AvatarProps {
  name: string;
  onChange: (file: File | null) => void;
  maxSizeInMegaBytes?: number;
}

export const EditableAvatar = ({ name, onChange, image, altText, className, maxSizeInMegaBytes = 5.0 }: Props) => {
  const [imageSrc, setImageSrc] = useState(image || placeholderImage);
  const [error, setError] = useState<string | undefined>(undefined);
  const schema = useMemo(() => getValidationsSchema(maxSizeInMegaBytes), [maxSizeInMegaBytes]);
  const hasError = !!error;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const file = target.files?.item(0);
    const validations = schema.safeParse({ sizeInBytes: file?.size, fileType: file?.type });

    if (!validations.success) {
      const firstError = validations.error.errors.at(0);

      setError(firstError?.message);
    }

    if (validations.success && !!file) {
      setError(undefined);
      setImageSrc(URL.createObjectURL(file));

      onChange(file);
    }
  };

  return (
    <div className={cx('flex flex-col gap-8', className)}>
      <label
        className="flex cursor-pointer flex-col items-center"
        htmlFor={name}
      >
        <PrimitiveAvatarWithButton
          avatar={
            <Image
              className="rounded-full"
              src={imageSrc as string}
              alt={altText || ''}
              priority
            />
          }
          button={
            <EditAvatarButton
              name={name}
              handleChange={handleChange}
            />
          }
          horizontalButtonPosition="right"
          verticalButtonPosition="top"
        />
      </label>

      {hasError && <FormMessage message={error} />}
    </div>
  );
};
