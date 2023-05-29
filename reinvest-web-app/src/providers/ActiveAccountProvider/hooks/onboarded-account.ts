import { StorageKeys } from 'constants/session-storage';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';
import { useSessionStorage } from 'usehooks-ts';

interface Params {
  activeAccount: AccountOverview | null;
  allAccounts: Maybe<AccountOverview>[];
  updateActiveAccount: (account: Maybe<AccountOverview>) => void;
}

interface Returns {
  deprecateLatestAccountOnboarded: () => void;
  latestAccountOnboardedId: string | null;
  setLatestAccountOnboardedId: Dispatch<SetStateAction<string | null>>;
}

export function useOnboardedAccount({ activeAccount, allAccounts, updateActiveAccount }: Params): Returns {
  const [latestAccountOnboardedId, setLatestAccountOnboardedId] = useSessionStorage<string | null>(StorageKeys.LATEST_ACCOUNT_ONBOARDED, null);

  const deprecateLatestAccountOnboarded = useCallback(() => {
    if (latestAccountOnboardedId) {
      setLatestAccountOnboardedId(null);
    }
  }, [latestAccountOnboardedId, setLatestAccountOnboardedId]);

  useEffect(() => {
    if (latestAccountOnboardedId && latestAccountOnboardedId !== activeAccount?.id) {
      const latestAccountOnboarded = allAccounts.find(account => account?.id === latestAccountOnboardedId);

      if (latestAccountOnboarded) {
        updateActiveAccount(latestAccountOnboarded);
      }
    } else {
      deprecateLatestAccountOnboarded();
    }
  }, [activeAccount, latestAccountOnboardedId, allAccounts, updateActiveAccount, deprecateLatestAccountOnboarded]);

  return { latestAccountOnboardedId, deprecateLatestAccountOnboarded, setLatestAccountOnboardedId };
}
