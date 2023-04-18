import { DialogProps } from '@hookooekoo/ui-dialog';
import { BlackModalDialog } from 'components/BlackModal/BlackModalDialog';

import { IconXCircle } from '../assets/icons/IconXCircle';
import { BlackModalTitle } from '../components/BlackModal/BlackModalTitle';

type Props = Omit<DialogProps, 'children'>;

export const UnableCreteTrustAccount = ({ isOpen, onOpenChange }: Props) => (
  <BlackModalDialog
    isOpen={isOpen}
    onOpenChange={onOpenChange}
  >
    <div className="flex h-full flex-col items-center gap-32 lg:mx-auto lg:max-w-330 lg:justify-center">
      <IconXCircle />
      <BlackModalTitle
        title="You are unable to create a Trust Account"
        subtitle="You need to be an authorized signatory and beneficiary owner of a corporation to have a trust account on REINVEST."
      />
    </div>
  </BlackModalDialog>
);
