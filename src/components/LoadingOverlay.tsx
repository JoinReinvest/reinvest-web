import { Dialog } from '@hookooekoo/ui-dialog';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  display?: boolean;
}

export const LoadingOverlay = ({ display = false, children }: Props) => (
  <>
    {children}

    <Dialog
      isOpen={display}
      className="loading-overlay"
    >
      <IconSpinner />
    </Dialog>
  </>
);
