import { IconFileUpload } from 'assets/icons/IconFileUpload';
import { BYTES_IN_MEGABYTE } from 'constants/conversions';
import { ChangeEventHandler, useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { z } from 'zod';

import { Typography } from '../../Typography';
import { FormMessage } from '../FormMessage';
import { UploadedFile } from './UploadedFile';

interface Props<FormFields extends FieldValues> extends UseControllerProps<FormFields> {
  label: string;
  placeholder: string;
  accepts?: string;
  sizeLimitInByMegaBytes?: number;
}

const getSchema = (accepts: string, sizeLimitInByMegaBytes: number) => {
  const sizeLimitInBytes = sizeLimitInByMegaBytes * BYTES_IN_MEGABYTE;

  return z
    .custom<File>()
    .refine(file => !!file, 'The field is required')
    .refine(file => file?.size <= sizeLimitInBytes, `File size must be smaller than ${sizeLimitInByMegaBytes}MB`)
    .refine(file => {
      const doesAcceptAnyType = accepts === '*';

      if (doesAcceptAnyType) {
        return true;
      }

      const fileType = file?.type;
      const doesFileTypeMatchAccepts = !!fileType?.match(accepts);

      return doesFileTypeMatchAccepts;
    }, 'File type not supported');
};

export function InputFile<FormFields extends FieldValues>({
  label,
  placeholder,
  accepts = '*',
  sizeLimitInByMegaBytes = 5,
  ...controllerProps
}: Props<FormFields>) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const { field } = useController(controllerProps);
  const schema = getSchema(accepts, sizeLimitInByMegaBytes);

  const clearFile = () => field.onChange(null);
  const hasFile = !!field.value;
  const hasErrorMessage = !!errorMessage;

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
      <Typography variant="paragraph-emphasized">{label}</Typography>

      <div>
        <input
          type="file"
          id={field.name}
          name={field.name}
          onChange={handleChange}
          className="peer hidden"
          accept={accepts}
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
