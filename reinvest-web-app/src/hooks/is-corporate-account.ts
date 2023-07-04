import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

/**
 * It is common that we have to distinct wheter the active
 * account is a corporate or trust. Use this hook with that
 * notion.
 */
export function useIsCorporateAccount() {
  const { activeAccount } = useActiveAccount();
  const isCorporateAccount = useMemo(() => activeAccount?.type === AccountType.Corporate, [activeAccount]);

  return isCorporateAccount;
}
