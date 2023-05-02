import { AvatarProps, AvatarWithButton as PrimitiveAvatarWithButton } from '@hookooekoo/ui-avatar';
import corporatePlaceholderImage from 'assets/images/corporate-avatar-placeholder.png';
import placeholderImage from 'assets/images/profile-picture-placeholder.png';
import trustPlaceholderImage from 'assets/images/trust-avatar-placeholder.png';
import { Avatar } from 'components/Avatar';
import { FormMessage } from 'components/FormElements/FormMessage';
import { ChangeEventHandler, useMemo, useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { mapToMimeType, PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { generateFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { EditAvatarButton } from './EditAvatarButton';

type PrimitiveProps = Pick<AvatarProps, 'image' | 'altText'>;
interface Props<FormFields extends FieldValues> extends PrimitiveProps, UseControllerProps<FormFields> {
  accountType?: DraftAccountType;
  onFileChange?: (file: File) => Promise<void>;
  sizeLimitInMegaBytes?: number;
}

export function InputAvatar<FormFields extends FieldValues>({
  image,
  altText,
  sizeLimitInMegaBytes = 5.0,
  onFileChange,
  accountType,
  ...controllerProps
}: Props<FormFields>) {
  const { field } = useController(controllerProps);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const fieldValue = field.value;

  const imageSrc = useMemo(() => {
    if (fieldValue && fieldValue?.file) {
      const fileUrl = URL.createObjectURL(fieldValue.file);

      return fileUrl;
    }

    const avatarPlaceholderImage = getPlaceholderImage(accountType);

    return image || avatarPlaceholderImage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValue]);

  const accepts: PartialMimeTypeKeys = ['jpeg', 'jpg', 'png'];
  const schema = generateFileSchema(accepts, sizeLimitInMegaBytes);
  const acceptsMimeTypes = mapToMimeType(accepts).join(',');

  const hasError = !!errorMessage;

  const handleChange: ChangeEventHandler<HTMLInputElement> = async ({ target }) => {
    const file = target.files?.item(0);
    const hasFile = !!file;

    if (hasFile) {
      const validationSchema = schema.safeParse({ file });
      onFileChange && (await onFileChange(file));

      if (!validationSchema.success) {
        const { errors } = validationSchema.error;
        const validationErrorMessage = errors.at(0)?.message;
        setErrorMessage(validationErrorMessage);
      }

      if (validationSchema.success) {
        setErrorMessage(undefined);
        field.onChange({ file } || null);
      }
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

const getPlaceholderImage = (accountType?: DraftAccountType) => {
  switch (accountType) {
    case DraftAccountType.Trust:
      return trustPlaceholderImage;
    case DraftAccountType.Corporate:
      return corporatePlaceholderImage;
    default:
      return placeholderImage;
  }
};
