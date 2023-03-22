import { IconTrashcan } from 'assets/icons/IconTrashcan';
import { Typography } from 'components/Typography';

interface UploadedFileProps {
  fileName: string;
  onRemove: () => void;
}
export const UploadedFile = ({ fileName, onRemove }: UploadedFileProps) => {
  return (
    <div className="flex items-center justify-between gap-8 border border-dashed border-green-frost-01 p-8">
      <Typography
        variant="button"
        className="text-left line-clamp-1"
      >
        {fileName}
      </Typography>
      <IconTrashcan
        className="cursor-pointer stroke-white"
        onClick={() => onRemove()}
      />
    </div>
  );
};
