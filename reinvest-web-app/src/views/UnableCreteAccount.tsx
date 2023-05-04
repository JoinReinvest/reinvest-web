import { DialogProps } from '@hookooekoo/ui-dialog';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { DialogBlack } from 'components/DialogBlack';
import { ModalTitle } from 'components/ModalElements/Title';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

type Props = Omit<DialogProps, 'children'> & { accountType: DraftAccountType };

export const UnableCreteAccount = ({ isOpen, onOpenChange, accountType }: Props) => {
  const title = accountType === DraftAccountType.Corporate ? 'You are unable to create a Corporate Account' : 'You are unable to create a Trust Account';

  return (
    <DialogBlack
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="flex h-full flex-col items-center gap-32 lg:mx-auto lg:max-w-330 lg:justify-center">
        <IconXCircle />
        <ModalTitle
          title={title}
          subtitle="You need to be an authorized signatory and beneficiary owner of a corporation to have a trust account on REINVEST."
        />
      </div>
    </DialogBlack>
  );
};
