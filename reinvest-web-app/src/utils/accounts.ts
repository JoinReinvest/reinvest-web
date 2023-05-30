import { AccountOverview, AccountType, Maybe } from 'reinvest-app-common/src/types/graphql';

interface AccountsWithAvatarLabel extends AccountOverview {
  avatarLabel?: string;
}

export const getAccountsWithLabel = (accounts: Maybe<AccountOverview>[]): Maybe<AccountsWithAvatarLabel>[] => {
  const individualAccounts = accounts.filter(account => account?.type === AccountType.Individual);
  const corporateAccounts = accounts.filter(account => account?.type === AccountType.Corporate && account?.avatar?.url);
  const trustAccounts = accounts.filter(account => account?.type === AccountType.Trust && account?.avatar?.url);
  const beneficiaryAccounts = accounts.filter(account => account?.type === AccountType.Beneficiary);

  const trustAccountsWithoutAvatar = accounts.filter(account => account?.type === AccountType.Trust && !account?.avatar?.url);
  const corporateAccountsWithoutAvatar = accounts.filter(account => account?.type === AccountType.Corporate && !account?.avatar?.url);

  const trustAccountsWithLabel = trustAccountsWithoutAvatar.map((account, index) => ({ ...account, avatarLabel: `T${index + 1}` }));
  const corporateAccountsWithLabel = corporateAccountsWithoutAvatar.map((account, index) => ({ ...account, avatarLabel: `C${index + 1}` }));
  const individualAccountWithLabel = individualAccounts.map(account => ({ ...account, avatarLabel: account?.avatar?.initials }));
  const beneficiaryAccountsWithLabel = beneficiaryAccounts.map(account => ({ ...account, avatarLabel: account?.avatar?.initials }));

  return [
    ...individualAccountWithLabel,
    ...trustAccountsWithLabel,
    ...corporateAccountsWithLabel,
    ...corporateAccounts,
    ...trustAccounts,
    ...beneficiaryAccountsWithLabel,
  ];
};
