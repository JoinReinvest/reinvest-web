import { AccountOverview, AccountStats, Maybe, Profile } from 'reinvest-app-common/src/types/graphql';
import { QueryMeta } from 'types/queries';

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
  individualAccount: AccountOverview | null;
  isAbleToAddBeneficiaries: boolean;
  setArrivesFromOnboarding: (value: boolean) => void;
  updateActiveAccount: (account: Maybe<AccountOverview>) => void;
  updateBankAccount: (bankAccount: string) => void;
  userProfile: Profile | null;
  userProfileMeta: QueryMeta;
}
