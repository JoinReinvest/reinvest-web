import { useMemo } from 'react';
import { AccountOverview, AccountType, Maybe } from 'reinvest-app-common/src/types/graphql';

interface Params {
  activeAccount: AccountOverview | null;
  allAccounts: Maybe<AccountOverview>[];
  beneficiaryAccounts: Maybe<AccountOverview>[];
}

interface Return {
  availableAccounts: Maybe<AccountOverview>[];
  individualAccount: AccountOverview | null;
}

/** for knowing which are the accounts that the user will be able to switch to */
export function useAvailableAccounts({ activeAccount, allAccounts, beneficiaryAccounts }: Params): Return {
  const availableAccounts = useMemo(
    () => getAvailableAccounts({ activeAccount, allAccounts, beneficiaryAccounts }),
    [activeAccount, allAccounts, beneficiaryAccounts],
  );

  const individualAccount = useMemo(() => availableAccounts.find(account => account?.type === AccountType.Individual) || null, [availableAccounts]);

  return { availableAccounts, individualAccount };
}

function getAvailableAccounts({ activeAccount, allAccounts, beneficiaryAccounts }: Params): Return['availableAccounts'] {
  const allAccountsExceptActiveAccount = allAccounts.filter(account => account?.id !== activeAccount?.id);
  const nonBeneficiaryAccounts = allAccountsExceptActiveAccount.filter(account => account?.type !== AccountType.Beneficiary);

  return [...nonBeneficiaryAccounts, ...beneficiaryAccounts];
}
