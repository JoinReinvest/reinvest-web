import { AvatarWithButton as PrimitiveAvatarWithButton } from '@hookooekoo/ui-avatar';
import placeholderImage from 'assets/images/profile-picture-placeholder.png';
import { Avatar } from 'components/Avatar';
import { AvatarProps } from 'components/Avatar/interfaces';
import { variants } from 'components/Avatar/variants';
import { ErrorMessage } from 'components/FormElements/ErrorMessage';
import { ImageProps } from 'next/image';
import { ChangeEventHandler, ComponentProps, useMemo, useState } from 'react';

import { AvatarEditableButton } from './AvatarEditableButton';
import { getValidationsSchema } from './schema';

interface Props extends Pick<AvatarProps, 'size'>, Pick<ComponentProps<typeof AvatarEditableButton>, 'name'> {
  name: string;
  onChange: (file: File | null) => void;
  alt?: ImageProps['alt'];
  maxSizeInMegaBytes?: number;
  src?: ImageProps['src'];
}

export const AvatarEditable = ({ name, onChange, src, alt, size = 'lg', maxSizeInMegaBytes = 5.0 }: Props) => {
  const [imageSrc, setImageSrc] = useState(src || placeholderImage);
  const [error, setError] = useState<string | undefined>(undefined);
  const className = variants({ size, className: 'rounded-full' });
  const schema = useMemo(() => getValidationsSchema(maxSizeInMegaBytes), [maxSizeInMegaBytes]);
  const hasError = !!error;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const file = target.files?.item(0);
    const validations = schema.safeParse({ sizeInBytes: file?.size, fileType: file?.type });

    if (validations.success === false) {
      const firstError = validations.error.errors.at(0);
      setError(firstError?.message);
    }

    if (validations.success === true && file) {
      setError(undefined);
      const fileUrl = URL.createObjectURL(file);
      setImageSrc(fileUrl);

      onChange(file || null);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <label
        className="flex cursor-pointer flex-col items-center"
        htmlFor={name}
      >
        <PrimitiveAvatarWithButton
          className={className}
          avatar={
            <Avatar
              src={imageSrc}
              altText={alt}
              size="full"
              className="!absolute"
            />
          }
          button={
            <AvatarEditableButton
              name={name}
              handleChange={handleChange}
            />
          }
          horizontalButtonPosition="right"
          verticalButtonPosition="bottom"
        />
      </label>

      {hasError && <ErrorMessage message={error} />}
    </div>
  );
};
