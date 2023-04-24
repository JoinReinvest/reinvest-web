import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from 'components/Button';
import { Typography } from 'components/Typography';

interface Props {
  description: string;
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  title: string;
  actionLabel?: string;
  cancelLabel?: string;
  onAction?: () => void;
}

export const ModalConfirmation = ({ isOpen, onOpenChange, title, description, actionLabel = 'Yes', cancelLabel = 'No', onAction }: Props) => {
  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-60 bg-black-01/50" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-70 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-24 bg-white px-24 py-32">
          <div className="flex flex-col gap-8">
            <AlertDialog.Title asChild>
              <Typography variant="bonus-heading">{title}</Typography>
            </AlertDialog.Title>

            <AlertDialog.Description asChild>
              <Typography
                variant="paragraph-large"
                className="text-gray-01"
              >
                {description}
              </Typography>
            </AlertDialog.Description>
          </div>

          <div className="flex justify-between gap-8">
            <AlertDialog.Action
              asChild
              onClick={onAction}
            >
              <Button
                variant="default"
                label={actionLabel}
              />
            </AlertDialog.Action>

            <AlertDialog.Cancel asChild>
              <Button
                variant="outlined"
                label={cancelLabel}
              />
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
