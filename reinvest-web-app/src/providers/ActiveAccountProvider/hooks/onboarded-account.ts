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
  arrivesFromOnboarding: boolean;
  deprecateLatestAccountOnboarded: () => void;
  latestAccountOnboardedId: string | null;
  setArrivesFromOnboarding: Dispatch<SetStateAction<boolean>>;
  setLatestAccountOnboardedId: Dispatch<SetStateAction<string | null>>;
}

export function useOnboardedAccount({ activeAccount, allAccounts, updateActiveAccount }: Params): Returns {
  const [latestAccountOnboardedId, setLatestAccountOnboardedId] = useSessionStorage<string | null>(StorageKeys.LATEST_ACCOUNT_ONBOARDED, null);
  const [arrivesFromOnboarding, setArrivesFromOnboarding] = useSessionStorage<boolean>(StorageKeys.ARRIVES_FROM_ONBOARDING, false);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAccount, latestAccountOnboardedId, allAccounts]);

  return { latestAccountOnboardedId, deprecateLatestAccountOnboarded, setLatestAccountOnboardedId, arrivesFromOnboarding, setArrivesFromOnboarding };
}
