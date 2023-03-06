import { Dialog, DialogClose, DialogProps } from '@hookooekoo/ui-dialog';
import { IconClose } from 'assets/icons/IconClose';
import { Typography } from 'components/Typography';
import { PropsWithChildren } from 'react';

type PrimitiveProps = Pick<DialogProps, 'isOpen' | 'onOpenChange'>;
export interface Props extends PrimitiveProps, PropsWithChildren {
  title: string;
}

export const InformationModal = ({ title, isOpen, onOpenChange, children }: Props) => (
  <Dialog
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    className="information-modal"
  >
    <div className="mx-auto flex h-full max-w-720 flex-col gap-40 max-lg:py-40 max-lg:px-20 lg:p-60">
      <header className="flex justify-end">
        <DialogClose>
          <IconClose className="stroke-white" />
        </DialogClose>
      </header>

      <article className="flex flex-col gap-24">
        <Typography
          variant="h5"
          className="text-center"
        >
          {title}
        </Typography>

        <div>{children}</div>
      </article>
    </div>
  </Dialog>
);
