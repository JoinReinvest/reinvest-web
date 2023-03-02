import { IconTrashcan } from '../../../assets/icons/IconTrashcan';
import { Typography } from '../../Typography';

interface UploadedFileProps {
  fileName: string;
  onRemove: () => void;
}
export const UploadedFile = ({ fileName, onRemove }: UploadedFileProps) => {
  return (
    <div className="flex items-center gap-8 border border-dashed border-green-frost-01 p-8">
      <Typography
        variant="button"
        className="text-left"
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
