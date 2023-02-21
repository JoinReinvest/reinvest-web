import { DialogClose } from '@hookooekoo/ui-dialog';
import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { Logo } from 'assets/Logo';

export const Header = () => (
  <header className="relative flex w-full items-center justify-center">
    <div className="absolute left-0 top-1/2 -translate-y-1/2">
      <DialogClose>
        <IconArrowLeft className="stroke-white" />
      </DialogClose>
    </div>
    <Logo className="fill-white" />
  </header>
);
