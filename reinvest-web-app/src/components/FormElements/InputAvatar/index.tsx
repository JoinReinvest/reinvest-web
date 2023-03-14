import { AvatarProps, AvatarWithButton as PrimitiveAvatarWithButton } from '@hookooekoo/ui-avatar';
import { Avatar } from 'components/Avatar';
import placeholderImage from 'assets/images/profile-picture-placeholder.png';
import { FormMessage } from 'components/FormElements/FormMessage';
import { mapToMimeType, PartialMimeTypeKeys } from 'constants/mime-types';
import { generateFileSchema } from 'formValidationRules';
import { ImageProps } from 'next/image';
import { ChangeEventHandler, useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { EditAvatarButton } from './EditAvatarButton';

type PrimitiveProps = Pick<AvatarProps, 'image' | 'altText'>;
interface Props<FormFields extends FieldValues> extends PrimitiveProps, UseControllerProps<FormFields> {
  sizeLimitInMegaBytes?: number;
}

export function InputAvatar<FormFields extends FieldValues>({ image, altText, sizeLimitInMegaBytes = 5.0, ...controllerProps }: Props<FormFields>) {
  const { field } = useController(controllerProps);
  const [imageSrc, setImageSrc] = useState<ImageProps['src']>(image || placeholderImage);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const accepts: PartialMimeTypeKeys = ['jpeg', 'jpg', 'png'];
  const schema = generateFileSchema(accepts, sizeLimitInMegaBytes);
  const acceptsMimeTypes = mapToMimeType(accepts).join(',');

  const hasError = !!errorMessage;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const file = target.files?.item(0);
    const validationSchema = schema.safeParse(file);

    if (!validationSchema.success) {
      const validationErrorMessage = validationSchema.error.message;
      setErrorMessage(validationErrorMessage);
    }

    if (validationSchema.success && !!file) {
      const fileUrl = URL.createObjectURL(file);

      setImageSrc(fileUrl);
      setErrorMessage(undefined);
      field.onChange(file || null);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <label
        className="flex cursor-pointer flex-col items-center"
        htmlFor={field.name}
      >
        <PrimitiveAvatarWithButton
          avatar={
            <Avatar
              src={imageSrc}
              alt={altText || 'Profile picture for user'}
              isSizeFixed
            />
          }
          button={
            <EditAvatarButton
              name={field.name}
              onChange={handleChange}
              accept={acceptsMimeTypes}
            />
          }
          horizontalButtonPosition="right"
          verticalButtonPosition="bottom"
        />
      </label>

      {hasError && <FormMessage message={errorMessage} />}
    </div>
  );
}
