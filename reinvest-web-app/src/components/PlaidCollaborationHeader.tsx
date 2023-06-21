import { Separator } from '@radix-ui/react-separator';
import { LogoIcon2 } from 'assets/LogoIcon2';
import { LogoPlaid } from 'assets/LogoPlaid';

export const PlaidCollaborationHeader = () => (
  <header className="flex justify-center gap-14">
    <LogoIcon2 className="h-25 w-auto" />

    <Separator
      orientation="vertical"
      className="w-1 bg-black-01"
    />

    <LogoPlaid />
  </header>
);
