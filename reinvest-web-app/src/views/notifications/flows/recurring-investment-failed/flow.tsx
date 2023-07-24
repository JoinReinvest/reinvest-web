import { IconSpinner } from 'assets/icons/IconSpinner';
import { useAccountManagement } from 'providers/AccountManagement';
import { useEffect } from 'react';

export function Flow() {
  const { setQueryFlow } = useAccountManagement();

  useEffect(() => {
    setQueryFlow('MANAGE_RECURRING_INVESTMENT');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid h-full w-full place-items-center">
      <IconSpinner color="black" />
    </div>
  );
}
