import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

import placeholderPicture from '../../assets/images/profile-picture-placeholder.png';
import { Avatar } from '../../components/Avatar';
import { Profile } from '../../types/graphql';

interface AccountMenuProps {
  profile: Profile;
}
export const AccountMenu = ({ profile }: AccountMenuProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={placeholderPicture}
          alt={`${profile.details?.firstName} ${profile.details?.lastName}`}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end">
          <div className="mt-8 border border-gray-03 bg-white text-button shadow-xl">
            <DropdownMenu.Item className="px-20 py-12">
              <Link href="/invite-friends-and-family">Invite Friends &amp; Family</Link>
            </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
