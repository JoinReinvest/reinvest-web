import { AccountOverview, AccountType, DraftAccountType, Maybe } from 'reinvest-app-common/src/types/graphql';

interface AccountsWithAvatarLabel extends AccountOverview {
  avatarLabel?: string;
}

export const getAccountsWithLabel = (availableAccounts: Maybe<AccountOverview>[]): Maybe<AccountsWithAvatarLabel>[] => {
  const individualAccounts = availableAccounts.filter(account => account?.type === DraftAccountType.Individual);
  const corporateAccounts = availableAccounts.filter(account => account?.type === DraftAccountType.Corporate && account?.avatar?.url);
  const trustAccounts = availableAccounts.filter(account => account?.type === DraftAccountType.Trust && account?.avatar?.url);
  const beneficiaryAccounts = availableAccounts.filter(account => account?.type === AccountType.Beneficiary);

  const trustAccountsWithoutAvatar = availableAccounts.filter(account => account?.type === DraftAccountType.Trust && !account?.avatar?.url);
  const corporateAccountsWithoutAvatar = availableAccounts.filter(account => account?.type === DraftAccountType.Corporate && !account?.avatar?.url);

  const trustAccountsWithLabel = trustAccountsWithoutAvatar.map((account, index) => ({ ...account, avatarLabel: `T${index + 1}` }));
  const corporateAccountsWithLabel = corporateAccountsWithoutAvatar.map((account, index) => ({ ...account, avatarLabel: `C${index + 1}` }));
  const individualAccountWithLabel = individualAccounts.map(account => ({ ...account, avatarLabel: account?.avatar?.initials }));

  return [
    ...trustAccountsWithLabel,
    ...corporateAccountsWithLabel,
    ...corporateAccounts,
    ...trustAccounts,
    ...individualAccountWithLabel,
    ...beneficiaryAccounts,
  ];
};
