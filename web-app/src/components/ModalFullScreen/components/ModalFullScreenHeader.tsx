import { DialogClose } from '@hookooekoo/ui-dialog';
import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { IconLogo } from 'assets/icons/IconLogo';

export const ModalFullScreenHeader = () => (
  <header className="px-16 pt-40 pb-18 flex items-center">
    <div className="relative inset-0">
      <div className="absolute -top-15 child:focus:outline-none">
        <DialogClose>
          <IconArrowLeft className="stroke-white" />
        </DialogClose>
      </div>
    </div>

    <IconLogo className="fill-white grow" />
  </header>
);
