import { IconFileUpload } from 'assets/icons/IconFileUpload';
import { BYTES_IN_MEGABYTE } from 'constants/conversions';
import { ChangeEventHandler, useMemo, useState } from 'react';

import { Typography } from '../../Typography';
import { ErrorMessage } from '../../BlackModal/ErrorMessage';
import { UploadedFile } from './UploadedFile';

export interface InputFileProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  placeholder: string;
  accepts?: string;
  file?: File | null;
  sizeLimitInByMegaBytes?: number;
}

export const InputFile = ({ label, name, placeholder, accepts = '*', file, onChange, sizeLimitInByMegaBytes = 5 }: InputFileProps) => {
  const sizeLimitInBytes = useMemo(() => sizeLimitInByMegaBytes * BYTES_IN_MEGABYTE, [sizeLimitInByMegaBytes]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const clearFiles = () => onChange(null);
  const hasFile = !!file;
  const hasError = !!errorMessage;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const newFile = target.files?.item(0);
    const newFileSize = newFile?.size || 0;

    if (newFileSize <= sizeLimitInBytes) {
      setErrorMessage(undefined);
      onChange(newFile || null);
    } else {
      setErrorMessage(`File must be smaller than ${sizeLimitInByMegaBytes}mb`);
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-8">
      <Typography variant="paragraph-emphasized">{label}</Typography>

      <div>
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleChange}
          className="peer hidden"
          accept={accepts}
          disabled={hasFile}
        />

        <label
          htmlFor={name}
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
          fileName={file.name}
          onRemove={clearFiles}
        />
      )}

      {hasError && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
