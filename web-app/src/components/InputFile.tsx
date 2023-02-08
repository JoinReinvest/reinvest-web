import { IconFileUpload } from 'assets/icons/IconFileUpload';
import { IconTrashcan } from 'assets/icons/IconTrashcan';
import { ChangeEventHandler, useMemo, useState } from 'react';

import { Typography } from './Typography';

interface Props {
  file: File | null;
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  placeholder: string;
  accepts?: string;
  sizeLimitInByMegaBytes?: number;
}

const MEGABYTE_IN_BYTES = 1048576;

export const InputFile = ({ label, name, placeholder, accepts = '*', file, onChange, sizeLimitInByMegaBytes = 5 }: Props) => {
  const sizeLimitInBytes = useMemo(() => sizeLimitInByMegaBytes * MEGABYTE_IN_BYTES, [sizeLimitInByMegaBytes]);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const file = target.files?.item(0);

    if ((file?.size || 0) <= sizeLimitInBytes) {
      setError(undefined);
      onChange(file || null);
    } else {
      const errorMessage = `File must be smaller than ${sizeLimitInByMegaBytes}mb`;
      setError(errorMessage);
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
          disabled={!!file}
        />

        <label
          htmlFor={name}
          className="flex w-full cursor-pointer items-center justify-center gap-8 bg-green-frost-01 p-8 peer-disabled:bg-gray-04"
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

      {!!file && (
        <UploadedFile
          file={file}
          onChange={onChange}
        />
      )}

      {!!error && <ErrorMessage message={error} />}
    </div>
  );
};

const UploadedFile = ({ file, onChange }: Pick<Props, 'file' | 'onChange'>) => {
  const onClick = () => {
    onChange(null);
  };

  return (
    <button
      className="flex w-full cursor-pointer items-center gap-8 border border-dashed border-green-frost-01 p-8"
      onClick={onClick}
    >
      <Typography
        variant="button"
        className="text-left"
      >
        {file?.name}
      </Typography>
      <IconTrashcan className="stroke-white" />
    </button>
  );
};

const ErrorMessage = ({ message }: { message: string }) => (
  <Typography
    variant="paragraph-small"
    className="text-tertiary-error"
  >
    {message}
  </Typography>
);
