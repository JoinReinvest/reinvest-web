import { IconFileUpload } from 'assets/icons/IconFileUpload';
import { Typography } from 'components/Typography';
import { mapToMimeType, PartialMimeTypeKeys } from 'constants/mime-types';
import { generateFileSchema } from 'formValidationRules';
import { ChangeEventHandler, useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { FormMessage } from '../FormMessage';
import { UploadedFile } from './UploadedFile';

interface Props<FormFields extends FieldValues> extends UseControllerProps<FormFields> {
  placeholder: string;
  accepts?: PartialMimeTypeKeys;
  label?: string;
  sizeLimitInMegaBytes?: number;
}

export function InputFile<FormFields extends FieldValues>({
  label,
  placeholder,
  accepts = ['jpeg', 'jpg', 'pdf', 'png'],
  sizeLimitInMegaBytes = 5,
  ...controllerProps
}: Props<FormFields>) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const { field } = useController(controllerProps);
  const schema = generateFileSchema(accepts, sizeLimitInMegaBytes);

  const clearFile = () => field.onChange(null);
  const hasFile = !!field.value;
  const hasErrorMessage = !!errorMessage;

  const acceptMimeTypes = mapToMimeType(accepts).join(',');

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const file = target.files?.item(0);
    const validationSchema = schema.safeParse(file);

    if (!validationSchema.success) {
      const validationErrorMessage = validationSchema.error.message;
      setErrorMessage(validationErrorMessage);
    }

    if (validationSchema.success) {
      setErrorMessage(undefined);
      field.onChange(file || null);
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-8">
      {!!label && <Typography variant="paragraph-emphasized">{label}</Typography>}

      <div>
        <input
          type="file"
          id={field.name}
          name={field.name}
          onChange={handleChange}
          className="peer hidden"
          accept={acceptMimeTypes}
          disabled={hasFile}
        />

        <label
          htmlFor={field.name}
          className="flex cursor-pointer items-center justify-center gap-8 bg-green-frost-01 p-8 peer-disabled:bg-gray-04"
        >
          <IconFileUpload />
          <Typography
            variant="paragraph-emphasized"
            className="text-black-01"
          >
            {placeholder}
          </Typography>
        </label>
      </div>

      {hasFile && (
        <UploadedFile
          fileName={field.value.name}
          onRemove={clearFile}
        />
      )}

      {hasErrorMessage && <FormMessage message={errorMessage} />}
    </div>
  );
}
