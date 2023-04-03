import { IconAdd } from 'assets/icons/IconAdd';
import { IconFileUpload } from 'assets/icons/IconFileUpload';
import { Typography } from 'components/Typography';
import { ChangeEventHandler, ReactNode, useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { mapToMimeType, PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas';

import { FormMessage } from './FormMessage';
import { UploadedFile } from './InputFile/UploadedFile';

interface Props<FormFields extends FieldValues> extends UseControllerProps<FormFields> {
  accepts?: PartialMimeTypeKeys;
  iconOnEmpty?: ReactNode;
  iconOnMeetsMinimum?: ReactNode;
  minimumNumberOfFiles?: number;
  placeholderOnEmpty?: string;
  placeholderOnMeetsMinimum?: string;
  sizeLimitInMegaBytes?: number;
}

export function InputMultiFile<FormFields extends FieldValues>({
  accepts = ['jpeg', 'jpg', 'pdf', 'png'],
  sizeLimitInMegaBytes = 5,
  minimumNumberOfFiles = 2,
  placeholderOnEmpty = 'Upload Files',
  placeholderOnMeetsMinimum = 'Add Additional Files',
  iconOnEmpty = <IconFileUpload />,
  iconOnMeetsMinimum = <IconAdd className="stroke-black-01" />,
  ...controllerProps
}: Props<FormFields>) {
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const { field } = useController(controllerProps);
  const schema = generateMultiFileSchema(accepts, sizeLimitInMegaBytes);

  const hasMinimumNumberOfFiles = files.length >= minimumNumberOfFiles;
  const acceptMimeTypes = mapToMimeType(accepts).join(',');
  const hasErrorMessage = !!errorMessage;

  const placeholder = hasMinimumNumberOfFiles ? placeholderOnMeetsMinimum : placeholderOnEmpty;
  const icon = hasMinimumNumberOfFiles ? iconOnMeetsMinimum : iconOnEmpty;

  const clearFile = (index: number) => {
    const copyOfFiles = [...files];
    const updatedFiles = copyOfFiles.splice(index, 1);

    field.onChange(updatedFiles);
    setFiles(updatedFiles);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const uploadedFiles = Array.from(target.files || []);
    const listOfFiles = [...files, ...uploadedFiles];
    const validationSchema = schema.safeParse(listOfFiles);

    if (!validationSchema.success) {
      const { errors } = validationSchema.error;
      const validationErrorMessage = errors.at(0)?.message;
      setErrorMessage(validationErrorMessage);
    }

    if (validationSchema.success) {
      setErrorMessage(undefined);
      field.onChange(listOfFiles || null);
      setFiles(listOfFiles);
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-8">
      <div>
        <input
          type="file"
          id={field.name}
          name={field.name}
          onChange={handleChange}
          className="peer hidden"
          accept={acceptMimeTypes}
          multiple
        />

        <label
          htmlFor={field.name}
          className="flex cursor-pointer items-center justify-center gap-8 bg-green-frost-01 p-8 peer-disabled:bg-gray-04"
        >
          {icon}

          <Typography
            variant="paragraph-emphasized"
            className="text-black-01"
          >
            {placeholder}
          </Typography>
        </label>
      </div>

      {files.map((file, index) => (
        <UploadedFile
          key={`${file.name}-${index}`}
          fileName={file.name}
          onRemove={() => clearFile(index)}
        />
      ))}

      {hasErrorMessage && <FormMessage message={errorMessage} />}
    </div>
  );
}
