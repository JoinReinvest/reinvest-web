import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';

export interface State {
  activeAccount: AccountOverview | null;
  allAccounts: Maybe<AccountOverview>[];
  arrivesFromOnboarding: boolean;
  /** Accounts that are available to be switched to. */
  availableAccounts: Maybe<AccountOverview>[];
  /** The masked bank account of the profile */
  bankAccount: string | null;
  individualAccount: AccountOverview | null;
  isAbleToAddBeneficiaries: boolean;
  refetchUserProfile: () => void;
  setArrivesFromOnboarding: (value: boolean) => void;
  updateActiveAccount: (account: Maybe<AccountOverview>) => void;
  updateBankAccount: (bankAccount: string) => void;
}
