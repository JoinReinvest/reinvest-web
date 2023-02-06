import { ReactNode } from 'react';
import { Dialog, DialogClose } from '@hookooekoo/ui-dialog';
import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { IconLogo } from 'assets/icons/IconLogo';
import { Button } from 'components/Button';
import { Typography } from './Typography';

interface Props {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  children: ReactNode;
  buttonText: string;
  buttonAction: () => void;
}

export const ModalFullscreen = ({ isOpen = false, onOpenChange, children, buttonText, buttonAction }: Props) => (
  <Dialog
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    className="modal-fullscreen"
  >
    <div className="h-full w-full grid grid-rows-[auto_1fr_auto] overflow-y-hidden">
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

      <div className="md:max-w-332 md:mx-auto p-24 overflow-auto">{children}</div>

      <footer className="md:max-w-332 md:mx-auto px-24 pb-36 md:pb-80 flex flex-col items-center gap-16">
        <Button
          className="self-center max-md:self-stretch"
          onClick={buttonAction}
          label={buttonText}
        />

        <Typography
          variant="paragraph-small"
          className="text-center text-white"
        >
          By continuing, you agree to the REINVEST{' '}
          <Typography
            variant="link"
            className="text-green-frost-01"
          >
            Terms of Conditions
          </Typography>{' '}
          and{' '}
          <Typography
            variant="link"
            className="text-green-frost-01"
          >
            Privacy Policy
          </Typography>
          .
        </Typography>
      </footer>
    </div>
  </Dialog>
);
