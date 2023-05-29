import { AccountOverview, AccountStats, Maybe, Profile } from 'reinvest-app-common/src/types/graphql';
import { MutationMeta, QueryMeta } from 'types/queries';

export interface State {
  activeAccount: AccountOverview | null;
  activeAccountStats: Maybe<AccountStats>;
  activeAccountStatsMeta: QueryMeta;
  allAccounts: Maybe<AccountOverview>[];
  arrivesFromOnboarding: boolean;
  /** Accounts that are available to be switched to. */
  availableAccounts: Maybe<AccountOverview>[];
  /** The masked bank account of the profile */
  bankAccount: string | null;
  canOpenAccount: boolean;
  individualAccount: AccountOverview | null;
  isAbleToAddBeneficiaries: boolean;
  isAccountBanned: boolean;
  previousAccount: AccountOverview | null;
  setArrivesFromOnboarding: (value: boolean) => void;
  updateActiveAccount: (account: Maybe<AccountOverview>) => void;
  updateBankAccount: (bankAccount: string) => void;
  userProfile: Profile | null;
  userProfileMeta: QueryMeta;
  validateActiveAccountMeta: MutationMeta;
}
