import * as Dialog from '@radix-ui/react-dialog';
import { IconClose } from 'assets/icons/IconClose';
import { IconGift } from 'assets/icons/IconGift';
import { LogoIcon } from 'assets/LogoIcon';
import { LogoIcon2 } from 'assets/LogoIcon2';
import { FieldCopyText } from 'components/FieldCopyText';
import { LinkButton } from 'components/LinkButton';
import { Typography } from 'components/Typography';
import { URL } from 'constants/urls';
import { Maybe } from 'reinvest-app-common/src/types/graphql';

interface Props {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  referralCodeUrl?: Maybe<string>;
}

export const ModalInvite = ({ isOpen, onOpenChange, referralCodeUrl }: Props) => {
  const referralCode = referralCodeUrl?.split('/').pop();

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black-01/50" />

        <Dialog.Content className="white-modal fixed right-0 top-0 z-50 flex flex-col justify-between px-24 pb-24 pt-40 md:px-44 md:pb-0 md:pt-80">
          <>
            <div className="flex flex-col gap-64">
              <header className="flex items-center justify-between md:hidden">
                <LogoIcon2 />

                <Dialog.Close asChild>
                  <IconClose />
                </Dialog.Close>
              </header>

              <div className="flex flex-col gap-40">
                <div className="flex items-center justify-center">
                  <IconGift />
                </div>

                <Typography
                  variant="h4"
                  className="text-center md:text-left"
                >
                  Invite friends and family to REINVEST more!
                </Typography>

                <div className="flex flex-col gap-24">
                  <Typography variant="bonus-heading">Earn up to $10 for every referral</Typography>

                  <Typography variant="paragraph-large">Your Referral Code: {referralCode}</Typography>
                </div>

                <div className="flex flex-col gap-16">
                  <FieldCopyText value={referralCodeUrl || ''} />

                  <Typography
                    variant="paragraph"
                    className="lowercase text-gray-01"
                  >
                    click above to copy link
                  </Typography>
                </div>

                <LogoIcon className="absolute bottom-0 -z-10 ml-50 h-460 w-460 fill-gray-04" />
              </div>
            </div>

            <footer className="flex w-full items-stretch md:hidden">
              <LinkButton
                href={URL.index}
                onClick={() => onOpenChange(false)}
                label="Dashboard"
              />
            </footer>
          </>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
