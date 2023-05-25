import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { IconAddAccount } from 'assets/icons/IconAddAccount';
import { IconAddBeneficiary } from 'assets/icons/IconAddBeneficiary';
import { IconFriendsAndFamily } from 'assets/icons/IconFriendsAndFamily';
import { IconSignOut } from 'assets/icons/IconSignOut';
import { IconSupport } from 'assets/icons/IconSupport';
import placeholderPicture from 'assets/images/profile-picture-placeholder.png';
import { Avatar } from 'components/Avatar';
import { Button } from 'components/Button';
import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';
import { EMAILS, URL } from 'constants/urls';
import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useGetInvitationLink } from 'reinvest-app-common/src/services/queries/getInvitationLink';
import { AccountOverview, AccountType, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { ViewAccountManagement } from 'views/account-management';

import { getAccountsWithLabel } from '../utilities/accounts';
import { AccountMenuAccountItem } from './AccountMenuAccountItem';
import { AccountMenuActionItem } from './AccountMenuActionItem';
import { AccountMenuFooter } from './AccountMenuFooter';
import { ModalAddBeneficiary } from './ModalAddBeneficiary';
import { ModalInvite } from './ModalInvite';

interface Props {
  activeAccount: AccountOverview;
}

export const AccountMenu = ({ activeAccount }: Props) => {
  const { isAbleToAddBeneficiaries, availableAccounts, updateActiveAccount } = useActiveAccount();
  const { data: invitationLink } = useGetInvitationLink(getApiClient);
  const [isMenuOpen, toggleIsMenuOpen] = useToggler(false);
  const [isModalInviteOpen, toggleIsModalInviteOpen] = useToggler(false);
  const [isModalAddBeneficiaryOpen, toggleIsModalAddBeneficiaryOpen] = useToggler(false);
  const [isModalManageAccount, toggleIsModalManageAccount] = useToggler(false);

  const availableAccountsWithLabels = getAccountsWithLabel(availableAccounts);

  const toggleActiveAccount = (account: Maybe<AccountOverview>) => {
    updateActiveAccount(account);
    toggleIsMenuOpen();
  };

  const handleModalManageAccountOpenChange = () => {
    toggleIsMenuOpen(false);
    toggleIsModalManageAccount(true);
  };

  const handleModalInviteOpenChange = () => {
    toggleIsMenuOpen(false);
    toggleIsModalInviteOpen(true);
  };

  const handleModalAddBeneficiaryOpen = () => {
    toggleIsMenuOpen(false);
    toggleIsModalAddBeneficiaryOpen(true);
  };

  const hasAvailableAccounts = availableAccounts.length > 0;

  return (
    <>
      <DropdownMenu.Root
        open={isMenuOpen}
        onOpenChange={toggleIsMenuOpen}
      >
        <DropdownMenu.Trigger>
          <Avatar
            src={activeAccount.avatar?.url || placeholderPicture}
            alt={activeAccount.label || ''}
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <div className="h-full w-full overflow-hidden">
            <div className="absolute inset-0 z-30 h-full w-full bg-black-01/50 md:bg-transparent" />

            <DropdownMenu.Content
              align="end"
              className="z-40 max-h-full w-screen overflow-auto px-24 pb-68 md:w-full md:px-0 md:pb-0"
            >
              <div className="flex w-full max-w-full flex-col gap-16 border border-gray-04 bg-white px-16 py-24 md:w-342">
                <header className="flex flex-col gap-16 px-24 py-16 shadow-md">
                  <div className="flex items-center gap-8">
                    <Avatar
                      src={activeAccount.avatar?.url || placeholderPicture}
                      alt={activeAccount.label || ''}
                      isSizeFixed
                      fixedSize="lg"
                    />

                    <div>
                      <Typography variant="button">{activeAccount.label}</Typography>

                      <Typography
                        variant="paragraph"
                        className="capitalize text-gray-02"
                      >
                        {activeAccount.type?.toLowerCase()} Account
                      </Typography>
                    </div>
                  </div>

                  <Button
                    label="Manage Account"
                    onClick={handleModalManageAccountOpenChange}
                  />
                </header>

                <ul className="flex flex-col gap-16">
                  <ul className="flex max-h-146 flex-col gap-16 overflow-auto md:max-h-256">
                    {hasAvailableAccounts &&
                      availableAccountsWithLabels.map(account => (
                        <AccountMenuAccountItem
                          key={`${account?.id}`}
                          imageSrc={account?.avatar?.url ?? undefined}
                          label={`${account?.label}`.toLowerCase()}
                          fallbackText={account?.avatar?.initials ?? undefined}
                          onClick={() => toggleActiveAccount(account)}
                          type={account?.type || AccountType.Individual}
                          labelForAvatar={account?.avatarLabel}
                        />
                      ))}
                  </ul>

                  {isAbleToAddBeneficiaries && (
                    <AccountMenuActionItem
                      label="Add Beneficiary"
                      onClick={handleModalAddBeneficiaryOpen}
                    >
                      <IconAddBeneficiary />
                    </AccountMenuActionItem>
                  )}

                  <AccountMenuActionItem
                    label="Add Another Account"
                    href={URL.onboarding}
                  >
                    <IconAddAccount />
                  </AccountMenuActionItem>

                  <Separator />

                  <AccountMenuActionItem
                    label="Invite Friends & Family"
                    onClick={handleModalInviteOpenChange}
                  >
                    <IconFriendsAndFamily />
                  </AccountMenuActionItem>

                  <AccountMenuActionItem
                    label="Help & Support"
                    href={EMAILS.supportHref}
                    opensInNewWindow
                  >
                    <IconSupport />
                  </AccountMenuActionItem>

                  <AccountMenuActionItem
                    label="Sign Out"
                    href={URL.logout}
                  >
                    <IconSignOut />
                  </AccountMenuActionItem>

                  <Separator />

                  <AccountMenuFooter />
                </ul>
              </div>
            </DropdownMenu.Content>
          </div>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {invitationLink?.url && (
        <ModalInvite
          isOpen={isModalInviteOpen}
          onOpenChange={toggleIsModalInviteOpen}
          referralCodeUrl={invitationLink.url}
        />
      )}

      <ModalAddBeneficiary
        isOpen={isModalAddBeneficiaryOpen}
        onOpenChange={toggleIsModalAddBeneficiaryOpen}
      />

      <ViewAccountManagement
        isModalOpen={isModalManageAccount}
        toggleIsModalOpen={toggleIsModalManageAccount}
      />
    </>
  );
};
