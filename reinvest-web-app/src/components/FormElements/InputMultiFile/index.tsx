import { IconAdd } from 'assets/icons/IconAdd';
import { IconFileUpload } from 'assets/icons/IconFileUpload';
import cx from 'classnames';
import { FormMessage } from 'components/FormElements/FormMessage';
import { Typography } from 'components/Typography';
import { ChangeEventHandler, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { mapToMimeType } from 'reinvest-app-common/src/constants/mime-types';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';

import { Props } from './interfaces';
import { UploadedFile } from './UploadedFile';

export function InputMultiFile<FormFields extends FieldValues>({
  variant = 'outlined',
  accepts = ['jpeg', 'jpg', 'pdf', 'png'],
  disabled = false,
  sizeLimitInMegaBytes = 5,
  minimumNumberOfFiles = 2,
  maximumNumberOfFiles = 5,
  placeholderOnEmpty = 'Upload Files',
  placeholderOnMeetsMinimum = 'Add Additional Files',
  iconOnEmpty = <IconFileUpload />,
  iconOnMeetsMinimum = <IconAdd className="stroke-black-01" />,
  onClearFileFromApi,
  onFilesChange,
  ...controllerProps
}: Props<FormFields>) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const { field } = useController(controllerProps);
  const schema = generateMultiFileSchema(accepts, sizeLimitInMegaBytes, minimumNumberOfFiles, maximumNumberOfFiles);
  const hasMinimumNumberOfFiles = (field.value?.length || 0) >= minimumNumberOfFiles;
  const acceptMimeTypes = mapToMimeType(accepts).join(',');
  const hasErrorMessage = !!errorMessage;
  const placeholder = hasMinimumNumberOfFiles ? placeholderOnMeetsMinimum : placeholderOnEmpty;
  const icon = hasMinimumNumberOfFiles ? iconOnMeetsMinimum : iconOnEmpty;

  const isOutlined = variant === 'outlined';
  const className = cx('flex items-stretch gap-8', { 'flex-col': isOutlined, 'flex-col-reverse': !isOutlined });

  const clearFile = async (index: number, document: DocumentFile) => {
    const copyOfFiles = [...field.value];
    copyOfFiles.splice(index, 1);
    field.onChange(copyOfFiles);

    const documentHasId = !!document.id;
    const willTriggerClearFileFromApi = !!onClearFileFromApi;

    if (documentHasId && willTriggerClearFileFromApi) {
      await onClearFileFromApi(document);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    event.preventDefault();

    const uploadedFiles = Array.from(event.target.files || []);
    const mappedFiles: DocumentFile[] = uploadedFiles.map(file => ({ file, fileName: file.name }));
    const listOfFiles = [...field.value, ...mappedFiles];
    const validationSchema = schema.safeParse(listOfFiles);

    if (!validationSchema.success) {
      const { errors } = validationSchema.error;
      const validationErrorMessage = errors.at(0)?.message;
      setErrorMessage(validationErrorMessage);
    }

    if (validationSchema.success) {
      setErrorMessage(undefined);
      field.onChange(listOfFiles || null);
      onFilesChange?.();

      event.target.value = '';
    }
  };

  return (
    <div className={className}>
      <div>
        <input
          type="file"
          id={field.name}
          name={field.name}
          ref={field.ref}
          onChange={handleChange}
          onBlur={field.onBlur}
          className="peer hidden"
          accept={acceptMimeTypes}
          multiple
          disabled={disabled}
        />

        <label
          htmlFor={field.name}
          className="flex cursor-pointer items-center justify-center gap-8 bg-green-frost-01 p-8 peer-disabled:cursor-auto peer-disabled:bg-gray-04"
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

      {(field?.value || []).map((document: DocumentFile, index: number) => (
        <UploadedFile
          variant={variant}
          key={document.id || `${document.fileName}-${index}` || document.file?.name}
          fileName={document.fileName || document.file?.name || ''}
          onRemove={() => clearFile(index, document)}
        />
      ))}

      {hasErrorMessage && <FormMessage message={errorMessage} />}
    </div>
  );
}
